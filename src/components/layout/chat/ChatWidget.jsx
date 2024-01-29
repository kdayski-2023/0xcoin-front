import React, { useEffect } from 'react';
import { Chat, Icon } from './components';
import useChat from '../../../hooks/useChat';
import MessageDialogServiceInstance from '../../../services/message-dialog.service';

const ChatWidget = () => {
  const {
    unreadMessages,
    messages,
    sendMessage,
    open,
    setOpen,
    loading,
    error,
    localError,
  } = useChat(localStorage.getItem('token'));

  useEffect(() => {
    if (error) {
      MessageDialogServiceInstance.showError(error.message);
    }
  }, [error]);

  return (
    <>
      {!error && (
        <>
          <Chat
            loading={loading}
            messages={messages}
            sendMessage={sendMessage}
            open={open}
            closeClick={() => setOpen(false)}
            localError={localError}
          />
          <Icon
            unreadMessages={unreadMessages}
            openClick={() => setOpen(true)}
            open={open}
          />
        </>
      )}
    </>
  );
};

export default ChatWidget;
