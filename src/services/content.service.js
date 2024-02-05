import { Subject, from, take } from 'rxjs';
import { GET } from '../api/fetch-api';

class ContentService {
  initialState = {
    loading: false,
    error: null,
    content: [],
  };

  state = this.initialState;
  state$ = new Subject();

  constructor() {
    this.apiUrl = process.env.REACT_APP_API_URL;
  }

  async getContent() {
    if (this.state.loading) {
      return;
    }

    this.state = {
      ...this.state,
      loading: true,
      error: null,
    };
    this.state$.next(this.state);

    const data$ = from(GET(`${this.apiUrl}/content`)).pipe(take(1));

    data$.subscribe({
      next: (result) => {
        this.state = {
          ...this.state,
          error: null,
          loading: false,
          content: result.data.data,
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

const ContentServiceInstance = new ContentService();
export default ContentServiceInstance;
