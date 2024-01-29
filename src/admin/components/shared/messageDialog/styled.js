import styled from 'styled-components';

export const MessageDialogWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999999;
  display: ${({ show }) => (show ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
`;

export const MessageDialogBlur = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(28px);
`;
// background: linear-gradient(115deg, #1c102f 0%, #2b1c4d 52.09%, #1c102f 100%);
export const MessageDialogCardWrapper = styled.div`
  z-index: 1;
  width: 900px;
  background-color: #383844;
  @media (max-width: 992px) {
    padding: 24px;
    width: 100%;
  }
`;

export const Card = styled.div`
  width: 100%;
  height: 100%;
  margin: auto;
  border-radius: 10px;
  padding: 32px;

  @media (max-width: 576px) {
    padding: 24px;
  }
`;

export const CardHeader = styled.div`
  font-weight: 700;
  font-size: 30px;
  line-height: 150%;

  @media (max-width: 576px) {
    font-size: 22px;
  }
`;

export const CardBody = styled.div`
  padding: 30px 0;
  font-weight: 400;
  font-size: 18px;
  line-height: 150%;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;

  @media (max-width: 768px) {
    font-size: 18px;
  }

  @media (max-width: 576px) {
    flex-direction: column;
  }

  .m-0 {
    margin: 0 !important;
  }
`;

export const CardFooter = styled.div`
  display: flex;
  justify-content: ${({ justify }) => (justify ? justify : 'center')};

  button {
    width: 50%;
    border: none;
    border-radius: 5px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--tg-heading-font-color);
    background-color: rgba(255, 255, 255, 0.15);
    p {
        color: #ffffff;
    }
  }

  @media (max-width: 576px) {
    button {
      width: 100%;
    }
  }
`;
