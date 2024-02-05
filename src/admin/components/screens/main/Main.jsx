import ChartPreviews from '../../shared/chartPreviews/ChartPreviews';
import Header from '../../shared/header/Header';
import News from '../../shared/news/News';
import Subscription from '../../shared/subscription/Subscription';
import Chart from '../../shared/chart/Chart';
import Button from '../../ui/button/Button';
import './Main.scss';
import CurrencyServiceInstance from 'services/currency.service';
import useNews from 'hooks/useNews';
// import useCurrency from 'hooks/useCurrency';

const Main = () => {
  const { loading } = useNews();
  // const { currency } = useCurrency();

  const handleClick = (value) => {
    CurrencyServiceInstance.setCurrency(value);
  };

  return (
    <section className="admin-content">
      <Header className="admin-content__title">
        <div className="main-header__wrapper">
          <h1>Dashboard</h1>
          <div className="main-header__tabs">
            <Button onClick={() => handleClick('ETH')} disabled={loading}>
              ETH
            </Button>
            <Button onClick={() => handleClick('BTC')} disabled={loading}>
              BTC
            </Button>
          </div>
        </div>
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
