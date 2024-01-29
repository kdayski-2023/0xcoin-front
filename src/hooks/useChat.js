import { useEffect, useRef, useState } from 'react';
import socketIOClient from 'socket.io-client';
import ChatServiceInstance from '../services/chat.service';

const NEW_CHAT_MESSAGE_EVENT = 'newChatMessage';
const OPEN_CHAT = 'openChat';
const ERROR = 'error';
const SOCKET_SERVER_URL = process.env.REACT_APP_SOCKET_URL;

const useChat = () => {
  const sessionToken = localStorage.getItem('token');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [localError, setLocalError] = useState(null);
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState(null);
  const [unreadMessages, setUnreadMessages] = useState([]);
  const socketRef = useRef();

  const setAllMessages = (messages) => {
    setMessages(messages);
    setUnreadMessages((prevState) =>
      messages ? messages.filter(({ unread }) => unread) : prevState
    );
  };

  const isLastMessageFromManager = (messages) => {
    return (
      messages &&
      messages.length &&
      messages[messages.length - 1]['sender'] === 'manager'
    );
  };

  useEffect(() => {
    const chat$ = ChatServiceInstance.state$.subscribe((state) => {
      setError(state.error);
      setLoading(state.loading);
      setAllMessages(state.messages);
    });

    return () => {
      chat$.unsubscribe();
    };
  }, []);

  useEffect(() => {
    ChatServiceInstance.getChat();
  }, []);

  useEffect(() => {
    if (open) {
      openChat();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, newMessage]);

  const sendMessage = (message) => {
    socketRef.current.emit(NEW_CHAT_MESSAGE_EVENT, {
      message,
      sender: 'user',
      unread: false,
    });
  };

  useEffect(() => {
    if (!socketRef.current || !socketRef.current.connected) {
      socketRef.current = socketIOClient(`${SOCKET_SERVER_URL}/chat`, {
        query: { sessionToken },
      });
    }

    const handleNewChatMessage = (messages) => {
      setAllMessages(messages);
      if (isLastMessageFromManager(messages)) {
        setNewMessage(messages[messages.length - 1]);
      }
    };

    socketRef.current.on(NEW_CHAT_MESSAGE_EVENT, handleNewChatMessage);
    socketRef.current.on('init', setAllMessages);
    socketRef.current.on(ERROR, setLocalError);
    socketRef.current.on(OPEN_CHAT, setAllMessages);

    return () => {
      socketRef.current.off(NEW_CHAT_MESSAGE_EVENT, handleNewChatMessage);
      socketRef.current.off('init', setAllMessages);
      socketRef.current.off(ERROR, setLocalError);
      socketRef.current.off(OPEN_CHAT, setAllMessages);
      socketRef.current.disconnect();
    };
  }, [sessionToken]);

  const openChat = () => {
    const socketConnected = socketRef.current && socketRef.current.connected;
    if (socketConnected && unreadMessages.length) {
      socketRef.current.emit(OPEN_CHAT);
    }
  };

  return {
    messages,
    sendMessage,
    unreadMessages,
    open,
    setOpen,
    loading,
    error,
    localError,
  };
};

export default useChat;
