import { take, Subject, from } from 'rxjs';
import { GET } from '../api/fetch-api';
import { checkStatus } from '../lib/lib';

class ChatService {
  initialState = {
    loading: false,
    error: null,
    messages: [],
  };

  state = this.initialState;
  state$ = new Subject();

  constructor() {
    this.apiUrl = process.env.REACT_APP_API_URL;
  }

  getChat() {
    if (this.state.loading) {
      return;
    }

    this.state = {
      ...this.state,
      loading: true,
    };
    this.state$.next(this.state);

    const data$ = from(GET(`${this.apiUrl}/chat`)).pipe(take(1));

    data$.subscribe({
      next: (result) => {
        checkStatus(result);
        this.state = {
          ...this.state,
          error: null,
          loading: false,
          messages: result.data.messages,
        };

        this.state$.next(this.state);
      },
      error: (error) => {
        this.state = {
          ...this.state,
          loading: false,
          error: error.message,
        };
        this.state$.next(this.state);
      },
    });
  }
}

const ChatServiceInstance = new ChatService();
export default ChatServiceInstance;
