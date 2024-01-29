import { useEffect, useRef, useState } from 'react';
import socketIOClient from 'socket.io-client';
import NewsServiceInstance from '../services/news.service';

const NEW_ITEM_EVENT = 'newItem';
const ERROR = 'error';
const SOCKET_SERVER_URL = process.env.REACT_APP_SOCKET_URL;

const useNews = () => {
  const sessionToken = localStorage.getItem('token');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [localError, setLocalError] = useState(null);
  const [news, setNews] = useState([]);
  const [newItem, setNewItem] = useState(null);
  const [unreadNews, setUnreadNews] = useState([]);
  const socketRef = useRef();

  const setAllNews = (news) => {
    setNews(news);
    setUnreadNews(news.filter(({ unread }) => unread));
  };

  useEffect(() => {
    const news$ = NewsServiceInstance.state$.subscribe((state) => {
      setError(state.error);
      setLoading(state.loading);
      setAllNews(state.news);
    });

    return () => {
      news$.unsubscribe();
    };
  }, []);

  useEffect(() => {
    NewsServiceInstance.getData();
  }, []);

  useEffect(() => {
    const socketConnected = socketRef.current && socketRef.current.connected;
    if (!socketConnected) {
      socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
        query: { sessionToken },
      });
    }

    if (socketConnected) {
      socketRef.current.on('connect', () => {
        console.log('socket connected');
      });

      socketRef.current.on(NEW_ITEM_EVENT, (newItems) => {
        NewsServiceInstance.appendNews(newItems);
        setNewItem(newItems[newItems.length - 1]);
      });

      socketRef.current.on('connect_error', (err) => {
        console.log(`connect_error due to ${err.message}`);
      });

      socketRef.current.on(ERROR, (error) => {
        console.log(error);
        setLocalError(error);
      });

      return () => {
        socketRef.current.disconnect();
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socketRef.current]);

  return {
    news,
    newItem,
    unreadNews,
    loading,
    error,
    localError,
  };
};

export default useNews;
