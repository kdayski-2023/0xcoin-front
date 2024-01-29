import styled from 'styled-components';

export const Chat = styled.form`
  background: #131722;
  padding: 20px 20px 30px;
  border-radius: 12px;
  position: fixed;
  bottom: 30px;
  right: ${({ open }) => (open ? '30px' : '-300px')};
  width: 300px;
  z-index: 12;
  transition: 0.3s;

  p {
    color: #ffffff;
  }

  @media (max-width: 576px) {
    right: ${({ open }) => (open ? '0' : '-100%')};
    width: calc(100% - 30px);
    top: 60px;
    margin: 15px;
    height: 534px;
  }
`;
export const Messages = styled.div`
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 260px;
  max-height: 320px;
  overflow-y: auto;
  @media (max-width: 576px) {
    max-height: 280px;
  }
`;

export const Message = styled.div`
  padding: 10px;
  width: max-content;
  max-width: 100%;
  background: #ffffff;

  border-radius: ${({ sender }) =>
    sender === 'manager' ? '20px 20px 20px 0px' : '20px 20px 0px 20px'};
  margin-right: ${({ sender }) => sender === 'manager' && 'auto'};
  margin-left: ${({ sender }) => sender === 'user' && 'auto'};
  overflow-wrap: break-word;

  p {
    margin: 0;
    color: #000000;
  }
`;

export const IconWrapper = styled.div`
  display: ${({ open }) => (open ? 'none' : 'flex')};
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  position: fixed;
  width: 40px;
  height: 40px;
  bottom: 40px;
  right: 30px;
  z-index: 11;
  transition: 0.3s;
  cursor: pointer;

  svg {
    path {
      fill: #ffffff;
    }
  }

  &:hover {
    background: #131722;
  }

  @media (max-width: 576px) {
    right: 15px;
    bottom: 15px;
  }
`;

export const Icon = styled.svg`
  transition: 0.3s;
`;

export const Count = styled.div`
  position: absolute;
  top: -10px;
  right: -10px;
  padding: 4px 8px;
  border-radius: 45px;
`;

export const Close = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;
  cursor: pointer;
`;

export const SendInput = styled.div`
  display: flex;
  align-items: center;

  textarea {
    border-radius: 4px;
    &::placeholder {
      font-size: 14px;
      color: #cecece;
    }
  }
`;
