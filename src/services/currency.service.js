import { Subject } from 'rxjs';

class CurrencyService {
  initialState = {
    loading: false,
    error: null,
    currency: 'BTC',
  };

  state = this.initialState;
  state$ = new Subject();

  async setCurrency(currency) {
    if (this.state.loading) {
      return;
    }
    this.state = {
      ...this.state,
      currency,
    };

    this.state$.next(this.state);
  }
}

const CurrencyServiceInstance = new CurrencyService();
export default CurrencyServiceInstance;
