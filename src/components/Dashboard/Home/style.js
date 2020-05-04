import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  background: #f9fbfc;
  min-height: 50vh;
  padding: 1em;
`;
export const Row = styled.div``;
export const Col = styled.div`
  display: flex;
  margin-bottom: 2em;
  position: relative;

  .spinner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  @media (max-width: 769px) {
    flex-direction: column;
  }

  .btn {
    background: teal;
    color: #eeeeee;
  }
`;
export const Card = styled.div`
  width: 20%;
  height: 100px;
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1em;
  margin-right: 1em;
  border-radius: 0.3em;
  box-shadow: 0 0 15px solid #cccccc;

  @media (max-width: 769px) {
    width: 100%;
    margin-bottom: 1em;
  }

  .total {
    display: flex;
    justify-content: space-between;

    i {
      font-size: 2em;
      color: orange;
    }
  }
`;
export const Project = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1em;

  @media (max-width: 769px) {
    grid-template-columns: 1fr;
  }
`;
export const Prob = styled.div`
  background: white;
  padding: 1em;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  h1 {
    font-size: 1.5em;
  }

  .link {
    color: #555555;

    p {
      padding-bottom: 1em;
    }
  }

  .private,
  .public {
    margin: 0;
    padding: 0.25em 0.5em;
    border-radius: 0.25em;
    background: teal;
    color: white;
    align-self: flex-start;
  }

  .public {
    background: orange;
  }
`;
export const Date = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const Menu = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;

  span {
    width: 5px;
    height: 5px;
    background: #888888;
    border-radius: 50%;
    margin-bottom: 2px;
  }
`;
export const Menus = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;

  span {
    width: 5px;
    height: 5px;
    background: #888888;
    border-radius: 50%;
    margin-bottom: 2px;
  }
`;
export const DropUp = styled.div`
  display: flex;
  flex-direction: column;
  background: ${(props) => (props.background ? props.background : "#f1f1f1")};
  padding: 1em;
  position: absolute;
  bottom: 1.3em;
  right: -1em;
  opacity: 0;
  pointer-events: none;
  z-index: 4;

  &.show {
    opacity: 1;
    pointer-events: visible;
  }

  p {
    padding-bottom: 0.5em;
    cursor: pointer;
  }
`;
export const DropUps = styled.div`
  display: flex;
  flex-direction: column;
  background: ${(props) => (props.background ? props.background : "#f1f1f1")};
  padding: 1em;
  position: absolute;
  bottom: 1.3em;
  right: -1em;
  opacity: ${(props) => (props.open ? 1 : 0)};
  pointer-events: none;
  z-index: 4;

  &.show {
    opacity: 1;
    pointer-events: visible;
  }

  p {
    padding-bottom: 0.5em;
    cursor: pointer;
  }
`;

export const Cover = styled.div`
  display: flex;
  align-items: center;

  .arrow {
    margin-right: 0.7em;
  }
`;

export const Headers = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: ${(props) => (props.paddingTop ? props.paddingTop : "")};
`;
export const TaskHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export const Welcome = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 1em 0;

  p {
    margin-left: 1em;
    font-size: 1.4em;
    text-transform: uppercase;
  }
`;
