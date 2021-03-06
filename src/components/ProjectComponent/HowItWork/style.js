import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;

  @media (max-width: 769px) {
    justify-content: center;
  }
`;
export const Row = styled.div`
  width: 100%;
  padding: 12% 10%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  @media (max-width: 769px) {
    grid-template-columns: 1fr;
    padding: 10% 1em;
  }
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
  padding-left: 10%;

  @media (max-width: 769px) {
    padding-left: 1em;
    margin: 0;
    padding: 0;
    padding-top: 1.5em;
  }
`;
export const Ul = styled.ul`
  list-style-image: url("../../../../assets/pyramid4.svg");
  padding-left: 15%;

  @media (max-width: 769px) {
    padding-left: 1em;
  }
`;
export const Li = styled.li`
  color: #444444;
  font-size: 1.3em;
  padding-bottom: 1em;
`;
export const Image = styled.div`
  color: #dddddd;
  width: 100%;

  @media (max-width: 769px) {
    img {
      width: 100%;
    }
  }

  img {
    display: block;
    width: 100%;
  }
`;
