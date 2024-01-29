import React, { useEffect, useRef, useState } from 'react';
import * as Styled from '../styled';
import useSupportFormik from '../hooks/useFormik';
import Close from '../../../../admin/assets/2.2/App/resources/img/cross-close.svg';

const Chat = ({
  messages,
  sendMessage,
  open,
  localError,
  closeClick,
  loading,
}) => {
  const { formik, error: submitError } = useSupportFormik(sendMessage);
  const chatDiv = useRef(null);
  const [error, setError] = useState(null);

  const handleChange = async (e) => {
    await formik.setFieldValue('message', e.target.value);
    formik.setFieldTouched('message');
  };

  useEffect(() => {
    chatDiv.current?.scrollIntoView();
  }, [messages]);

  useEffect(() => {
    setError(localError || submitError);
  }, [submitError, localError]);

  return (
    <Styled.Chat open={open} onSubmit={formik.handleSubmit}>
      <div
        padding={'40px 20px 20px'}
        flex
        justify={'flex-start'}
        height={'100%'}
      >
        <Styled.Close onClick={closeClick}>
          <img src={Close} alt="close" width={20} height={20} />
        </Styled.Close>
        <div display={'flex'} gap={'10px'} direction={'column'}>
          <p>SUPPORT</p>
          <p>Working hours from 9:00 am till 7 pm UTC</p>
        </div>
        {messages && messages.length ? (
          <div>
            <Styled.Messages>
              {messages.map(({ message, sender }, i) => (
                <Styled.Message key={i} sender={sender}>
                  <p>{message}</p>
                </Styled.Message>
              ))}
              <span ref={chatDiv}></span>
            </Styled.Messages>
          </div>
        ) : (
          <></>
        )}
        <div>
          <Styled.SendInput>
            {error && (
              <p style={{ position: 'absolute', top: '-20px', right: '0' }}>
                {error}
              </p>
            )}
            <textarea
              type="textarea"
              value={formik.values.message}
              onChange={handleChange}
              placeholder="Write a message"
              style={{ width: '100%', height: '37px' }}
            />
            <button
              type="submit"
              disabled={!formik.isValid}
              className="admin-btn admin-btn-theme"
            >
              SEND
            </button>
          </Styled.SendInput>
          {formik.errors.message && (
            <div
              className="admin-invalid-feedback"
              style={{
                position: 'absolute',
                display: 'block',
                fontSize: '14px',
              }}
            >
              {formik.errors.message}
            </div>
          )}
        </div>
      </div>
    </Styled.Chat>
  );
};

export default Chat;
