import NewsItem from './newsItem/NewsItem';

const NewsList = ({ news }) => {
  return (
    <ul className="listview">
      {news.map((news) => (
        <NewsItem key={news.id} news={news} />
      ))}
    </ul>
  );
};

export default NewsList;
