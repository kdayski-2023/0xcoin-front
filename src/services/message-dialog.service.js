import { Subject } from 'rxjs';

class MessageDialogService {
  initialState = {
    show: false,
    message: '',
    header: '',
    type: '',
  };

  state$ = new Subject(this.initialState);

  show(message, header = 'Attention') {
    this.state$.next({
      ...this.initialState,
      show: true,
      message,
      type: 'attention',
      header,
    });
  }

  hide() {
    this.state$.next({
      ...this.initialState,
      show: false,
    });
  }

  showError(message, header = 'Error') {
    this.state$.next({
      ...this.initialState,
      show: true,
      message,
      type: 'warning',
      header,
    });
  }

  showWarning(message, header = 'Warning') {
    this.state$.next({
      ...this.initialState,
      show: true,
      message,
      type: 'warning',
      header,
    });
  }

  showPermanent(message, header = 'Error') {
    this.state$.next({
      ...this.initialState,
      show: true,
      message,
      type: 'permanent',
      header,
    });
  }

  showSuccess(message, header = 'Success') {
    this.state$.next({
      ...this.initialState,
      show: true,
      message,
      type: 'success',
      header,
    });
  }
}

const MessageDialogServiceInstance = new MessageDialogService();
export default MessageDialogServiceInstance;
