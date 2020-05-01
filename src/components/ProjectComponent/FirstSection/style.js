import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  /* background: rgba(0, 200, 230, 0.9); */
  background: orangered;
  border-bottom-right-radius: 30%;
  border-bottom-left-radius: 30%;
`;
export const Row = styled.div`
  padding: 12% 10%;

  @media (max-width: 769px) {
    padding: 10% 2%;
    margin: 0 !important;
  }
`;
export const Col = styled.div``;
export const H1 = styled.h1`
  font-size: 5em;
  color: #eeeeee;
`;
export const H2 = styled.h2`
  font-size: 4em;
  color: #dddddd;

  @media (max-width: 769px) {
    font-size: 2em;
  }
`;
export const P = styled.p`
  color: #dddddd;
  width: 50%;
`;
