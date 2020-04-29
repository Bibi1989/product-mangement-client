import styled from "styled-components";

export const Container = styled.div`
  position: absolute;
  top: 0;
  width: 100%;

  .btn,
  .btn-login {
    background: orangered;
    border: none;
    border-radius: 30px;
    color: white;
    padding: 0.7em 1.4em;
    position: static !important;
    margin: 0.8em 0;
    cursor: pointer;
  }

  .create {
    background: teal;
    border: none;
    border-radius: 30px;
    color: white;
    padding: 0.7em 1.4em;
    position: absolute !important;
    top: 50%;
    cursor: pointer;
  }

  .btn-login {
    margin-left: -100px;
    background: teal;
  }
`;
export const Modal = styled.div`
  width: 100%;
  min-height: 100vh;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const ModalContent = styled.div`
  width: ${(props) => (props.width ? props.width : "40%")};
  background: white;
  padding: 1em;
  border-radius: 0.25em;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.8);

  @media (max-width: 769px) {
    width: 95%;
  }
`;
export const ModalHeader = styled.div`
  padding-bottom: 2em;
  border-bottom: 1px solid #999999;
`;
export const ModalBody = styled.div`
  padding: 1.5em 0;
`;
export const ModalFooter = styled.div`
  padding: 1.5em 0;
  border-top: 1px solid #999999;
`;
export const Div = styled.div`
  padding-top: 1.5em;
  text-align: center;

  span {
    padding: 0.7em 1.4em;
    background: orangered;
    color: #eeeeee;
    border-radius: 30px;
    margin: 0 0.5em;
  }
`;
export const H1 = styled.h1`
  text-align: center;
  color: #999;
  font-size: 1.5em;
`;
export const Close = styled.h1`
  text-align: center;
  color: orangered;
  font-size: 5.5em;
  cursor: pointer;
  position: absolute;
  top: 2%;
  right: 10%;
`;
