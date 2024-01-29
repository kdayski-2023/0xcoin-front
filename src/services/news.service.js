import { Subject, from, take } from 'rxjs';
import { GET } from '../api/fetch-api';

class NewsService {
  initialState = {
    loading: false,
    error: null,
    news: [],
  };

  state = this.initialState;
  state$ = new Subject();

  constructor() {
    this.apiUrl = process.env.REACT_APP_API_URL;
  }

  async appendNews(news) {
    if (this.state.loading) {
      return;
    }
    this.state = {
      ...this.state,
      news: [...this.state.news, ...news],
    };

    this.state$.next(this.state);
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

    const data$ = from(GET(`${this.apiUrl}/admin/news`)).pipe(take(1));

    data$.subscribe({
      next: (result) => {
        this.state = {
          ...this.state,
          error: null,
          loading: false,
          news: result.data.news,
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

const NewsServiceInstance = new NewsService();
export default NewsServiceInstance;
