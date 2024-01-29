import ChartPreviews from '../../shared/chartPreviews/ChartPreviews';
import Header from '../../shared/header/Header';
import News from '../../shared/news/News';
import Subscription from '../../shared/subscription/Subscription';
import Chart from '../../shared/chart/Chart';

const Main = () => {
  return (
    <section className="admin-content">
      <Header className="admin-content__title">
        <h1>Dashboard</h1>
      </Header>
      <ChartPreviews />
      <div className="admin-row">
        <div className="admin-col-lg-6">
          <News />
        </div>
        <div className="admin-col-lg-6">
          <Subscription />
          <Chart />
        </div>
      </div>
    </section>
  );
};

export default Main;
