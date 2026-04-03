import { useEffect, useRef, useState } from 'react';
import socketIOClient from 'socket.io-client';
import NewsServiceInstance from '../services/news.service';
import useCurrency from './useCurrency';

const NEW_ITEM_EVENT = 'newItem';
const ERROR = 'error';
const SOCKET_SERVER_URL = process.env.REACT_APP_SOCKET_URL;

const useNews = () => {
  const sessionToken = localStorage.getItem('token');
  const { currency } = useCurrency();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [localError, setLocalError] = useState(null);
  const [news, setNews] = useState([]);
  const [newItem, setNewItem] = useState(null);
  const [unreadNews, setUnreadNews] = useState([]);
  const socketRef = useRef(null);

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
    if (currency) {
      NewsServiceInstance.getData(currency);
    }
  }, [currency]);

  useEffect(() => {
    const initSocket = () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
      socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
        query: { sessionToken, currency },
      });

      socketRef.current.on('connect', () => {
        console.log('Socket connected');
      });

      socketRef.current.on(NEW_ITEM_EVENT, (newItems) => {
        const validCurrencyNews = newItems.filter((item) =>
          item.tags.some((tag) => tag.tag === currency)
        );
        NewsServiceInstance.appendNews(validCurrencyNews);
        setNewItem(validCurrencyNews[validCurrencyNews.length - 1]);
      });

      socketRef.current.on('connect_error', (err) => {
        console.log(`Connect_error due to ${err.message}`);
      });

      socketRef.current.on(ERROR, (error) => {
        console.log(error);
        setLocalError(error);
      });
    };

    initSocket();

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [currency, sessionToken]);

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
