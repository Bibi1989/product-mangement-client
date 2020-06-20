import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  min-height: 30vh;
  display: flex;
  align-items: center;
  background: orangered;
`;
export const Row = styled.div`
  width: 100%;
  padding: 2% 20%;
  display: flex;
  justify-content: space-between;

  @media (max-width: 769px) {
    grid-template-columns: 1fr;
    padding: 10% 1em;
    flex-direction: column;
  }
`;
export const Col = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  h2 {
    color: white;
  }

  p {
    color: white;
  }
`;
export const H1 = styled.h1`
  font-size: 3em;
  color: #444444;
  padding-left: 10%;
`;
export const Ul = styled.ul`
  list-style-image: url("../../../../assets/pyramid4.svg");
  padding-left: 15%;

  @media (max-width: 769px) {
    grid-template-columns: 1fr;
    padding: 5% 1em;
  }
`;
export const Li = styled.li`
  color: #ffffff;
  font-size: 1.3em;
  padding-bottom: 1em;
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
