import { Subject, from, take } from 'rxjs';
import { GET, POST } from '../api/fetch-api';

class SubscriptionService {
  initialState = {
    loading: false,
    error: null,
    subscription: null,
    prices: [],
  };

  state = this.initialState;
  state$ = new Subject();

  constructor() {
    this.apiUrl = process.env.REACT_APP_API_URL;
  }

  async getData() {
    if (this.state.loading) {
      return;
    }

    this.state = {
      ...this.state,
      loading: true,
      error: null,
    };
    this.state$.next(this.state);

    const data$ = from(GET(`${this.apiUrl}/subscribe`)).pipe(take(1));

    data$.subscribe({
      next: (result) => {
        this.state = {
          ...this.state,
          error: null,
          loading: false,
          subscription: result.data.subscription,
          prices: result.data.prices,
        };

        this.state$.next(this.state);
      },
      error: (error) => {
        this.state = {
          ...this.initialState,
          error: error.message,
        };
        this.state$.next(this.state);
      },
    });
  }

  async subscribe(body) {
    if (this.state.loading) {
      return;
    }

    this.state = {
      ...this.state,
      loading: true,
      error: null,
    };
    this.state$.next(this.state);

    const data$ = from(POST(`${this.apiUrl}/subscribe`, body)).pipe(take(1));

    data$.subscribe({
      next: (result) => {
        this.state = {
          ...this.state,
          error: null,
          loading: false,
          subscription: result.data.subscription,
        };

        this.state$.next(this.state);
      },
      error: (error) => {
        this.state = {
          ...this.initialState,
          error: error.message,
        };
        this.state$.next(this.state);
      },
    });
  }
}

const SubscriptionServiceInstance = new SubscriptionService();
export default SubscriptionServiceInstance;
