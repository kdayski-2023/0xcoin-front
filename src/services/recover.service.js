import { Subject, from, take } from 'rxjs';
import { POST } from '../api/fetch-api';

class RecoverService {
  initialState = {
    loading: false,
    error: null,
    recoverLink: null,
    success: false,
  };

  state = this.initialState;
  state$ = new Subject();

  constructor() {
    this.apiUrl = process.env.REACT_APP_API_URL;
  }

  async getRecoverLink(body) {
    if (this.state.loading) {
      return;
    }

    this.state = {
      ...this.state,
      loading: true,
    };
    this.state$.next(this.state);

    const data$ = from(POST(`${this.apiUrl}/auth/get_recover_link`, body)).pipe(
      take(1)
    );

    data$.subscribe({
      next: (result) => {
        this.state = {
          ...this.state,
          error: null,
          loading: false,
          recoverLink: result.data.recoverLink,
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

  async recover(body) {
    if (this.state.loading) {
      return;
    }

    this.state = {
      ...this.state,
      loading: true,
      error: null,
      success: false,
    };
    this.state$.next(this.state);

    const data$ = from(POST(`${this.apiUrl}/auth/recover`, body)).pipe(take(1));

    data$.subscribe({
      next: (result) => {
        this.state = {
          ...this.state,
          error: null,
          loading: false,
          success: true,
        };

        this.state$.next(this.state);
      },
      error: (error) => {
        this.state = {
          ...this.initialState,
          error: error.message,
          success: false,
        };
        this.state$.next(this.state);
      },
    });
  }
}

const RecoverServiceInstance = new RecoverService();
export default RecoverServiceInstance;
