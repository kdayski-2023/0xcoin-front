import { Subject, from, take } from 'rxjs';
import { POST } from '../api/fetch-api';

class RegisterService {
  initialState = {
    loading: false,
    error: null,
    sessionToken: '',
  };

  state = this.initialState;
  state$ = new Subject();

  constructor() {
    this.apiUrl = process.env.REACT_APP_API_URL;
  }

  async register(body) {
    if (this.state.loading) {
      return;
    }

    this.state = {
      ...this.state,
      loading: true,
    };
    this.state$.next(this.state);

    const data$ = from(POST(`${this.apiUrl}/auth/register`, body)).pipe(
      take(1)
    );

    data$.subscribe({
      next: (result) => {
        this.state = {
          ...this.state,
          error: null,
          loading: false,
          sessionToken: result.data.token,
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

const RegisterServiceInstance = new RegisterService();
export default RegisterServiceInstance;
