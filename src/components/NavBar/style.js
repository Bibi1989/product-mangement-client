import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  padding: 0 10%;

  @media (max-width: 769px) {
    padding: 0 1em;
  }
`;
export const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 8vh;
`;
export const Logo = styled.div`
  display: flex;
  align-items: center;

  .img {
    img {
      display: block;
      width: 3em;
    }
  }

  h3 {
    color: teal;
    margin: 0;

    span {
      color: orangered;
    }
  }
`;
export const User = styled.div`
  display: flex;
  align-self: center;
  margin: 0.8em 0;
  /* margin-right: 5%; */
  height: 100%;

  button {
    margin-left: 0.8em;
  }
`;
export const Ul = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0.8em 0;

  .user {
    margin-right: 1em;
    font-size: 1.2em;
  }

  .links {
    text-decoration: none;
    color: #555555;
  }
`;
export const Li = styled.li`
  &.login {
    padding: 0.8em 2em;
    background: teal;
    color: #eeeeee;
    border-radius: 30px;
  }
  &.logout {
    padding: 0.8em 2em;
    background: orangered;
    color: #eeeeee;
    border-radius: 30px;
  }
  &.register {
    padding: 0.8em 2em;
    background: orangered;
    color: #eeeeee;
    border-radius: 30px;
    margin-left: 1em;
  }
`;
export const ModalBody = styled.div``;
// export const Container = styled.div``
