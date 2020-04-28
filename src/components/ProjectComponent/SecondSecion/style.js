import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
`;
export const Row = styled.div`
  padding: 12% 10% 0 10%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 2em;

  @media (max-width: 769px) {
    grid-template-columns: 1fr;
    padding: 10% 1em;
  }
`;
export const Col = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  p {
    color: #555555;
    line-height: 2;
  }

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
  width: 100%;
`;
export const Image = styled.div`
  color: #dddddd;
  width: 100%;

  @media (max-width: 769px) {
    width: 100%;
  }

  img {
    display: block;
    width: 100%;
  }
`;
