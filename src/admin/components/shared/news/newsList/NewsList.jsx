import useCurrency from 'hooks/useCurrency';
import useNews from '../../../../../hooks/useNews';
import NewsItem from './newsItem/NewsItem';

const NewsList = () => {
  const { currency } = useCurrency();
  const { news } = useNews(currency);
  return (
    <ul className="admin-listview">
      {news.map((news, idx) => (
        <NewsItem key={idx} news={news} />
      ))}
    </ul>
  );
};

export default NewsList;
