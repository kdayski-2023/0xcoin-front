import NewsList from './newsList/NewsList';

const News = () => {
  return (
    <div className="admin-card">
      <div className="admin-card-body">
        <h4 className="admin-card-title">News</h4>
        <NewsList />
      </div>
    </div>
  );
};

export default News;
