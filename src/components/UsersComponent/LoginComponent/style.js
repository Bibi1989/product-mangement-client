import styled from "styled-components";

export const Container = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
`;
export const Modal = styled.div`
  width: 100%;
  min-height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
export const ModalContent = styled.div`
  width: 40%;
  background: #eeeeee;
  padding: 1em;
  border-radius: 0.25em;
`;
export const ModalHeader = styled.div`
  padding-bottom: 2em;
  border-bottom: 1px solid #999999;
`;
export const ModalBody = styled.div`
  padding-top: 1.5em;
`;
export const H1 = styled.h1`
  text-align: center;
  color: orangered;
  font-size: 2.5em;
`;
export const Close = styled.h1`
  text-align: center;
  color: orangered;
  font-size: 5.5em;
  cursor: pointer;
  position: absolute;
  top: 10%;
  right: 10%;
`;
