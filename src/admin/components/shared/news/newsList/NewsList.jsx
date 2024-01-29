import useNews from '../../../../../hooks/useNews';
import NewsItem from './newsItem/NewsItem';

const NewsList = () => {
  const { news } = useNews();
  return (
    <ul className="admin-listview">
      {news.map((news, idx) => (
        <NewsItem key={idx} news={news} />
      ))}
    </ul>
  );
};

export default NewsList;
