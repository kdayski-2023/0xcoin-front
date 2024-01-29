import React, { useEffect, useState } from 'react';
import MessageDialogService from '../../../../services/message-dialog.service';
import {
  MessageDialogWrapper,
  MessageDialogBlur,
  MessageDialogCardWrapper,
} from './styled';
import { Card, CardFooter, CardBody, CardHeader } from './styled';


const MessageDialog = () => {
  const [dialog, setDialog] = useState({
    show: false,
  });

  useEffect(() => {
    const state$ = MessageDialogService.state$.subscribe((state) => {
      setDialog(state);
    });

    return () => {
      state$.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (dialog) {
      setTimeout(() => {
        document.body.style.overflowY = dialog.show ? 'hidden' : 'auto';
      });
    }

    return () => {
      document.body.style.overflowY = 'auto';
    };
  }, [dialog]);

  return (
    <>
      <MessageDialogWrapper show={dialog.show}>
        <MessageDialogBlur
          onClick={() =>
            dialog.type !== 'permanent' && MessageDialogService.hide()
          }
        />
        <MessageDialogCardWrapper>
          <Card shadow={true}>
            <CardHeader>{dialog.header}</CardHeader>
            <CardBody>
              <div className="m-0"></div>
              {dialog.type === 'permanent' ? (
                <div
                  className="m-0"
                  dangerouslySetInnerHTML={{ __html: dialog.message }}
                />
              ) : (
                <p size="large" className="m-0">
                  {dialog.message}
                </p>
              )}
            </CardBody>
            <CardFooter>
              {dialog.type !== 'permanent' && (
                <button className="sine-btn" type="submit" onClick={() => MessageDialogService.hide()}>
                  <p style={{margin: "8px 0 8px 0"}} lh={'100%'}>Close</p>
                </button>
              )}
            </CardFooter>
          </Card>
        </MessageDialogCardWrapper>
      </MessageDialogWrapper>
    </>
  );
};

export default MessageDialog;
