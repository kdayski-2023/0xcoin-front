import { Subject, from, take } from 'rxjs';
import { POST } from '../api/fetch-api';

class ContactService {
  initialState = {
    loading: false,
    error: null,
    success: false,
  };

  state = this.initialState;
  state$ = new Subject();

  constructor() {
    this.apiUrl = process.env.REACT_APP_API_URL;
  }

  async contact(body) {
    if (this.state.loading) {
      return;
    }

    this.state = {
      ...this.initialState,
      loading: true,
    };
    this.state$.next(this.state);

    const data$ = from(POST(`${this.apiUrl}/support/contact`, body)).pipe(
      take(1)
    );

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
        };
        this.state$.next(this.state);
      },
    });
  }
}

const ContactServiceInstance = new ContactService();
export default ContactServiceInstance;
