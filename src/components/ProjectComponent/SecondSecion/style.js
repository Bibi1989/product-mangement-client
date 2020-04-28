import styled from "styled-components";

export const Container = styled.div`
  min-height: 80vh;
  display: flex;
  align-items: center;
`;
export const Row = styled.div`
  padding: 0 10%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;
export const Col = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  .started {
    border-radius: 25px;
    align-self: flex-start;
    margin-top: 2em;
  }
`;
export const H1 = styled.h1`
  font-size: 3em;
  color: #444444;
`;
export const H2 = styled.h2`
  font-size: 3em;
  color: #777777;
`;
export const P = styled.p`
  color: #dddddd;
  width: 80%;
`;
export const Image = styled.div`
  color: #dddddd;
  width: 100%;

  img {
    display: block;
    width: 80%;
  }
`;
