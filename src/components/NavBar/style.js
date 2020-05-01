import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  padding: 0 10%;

  @media (max-width: 769px) {
    padding: 0;
  }
`;
export const Nav = styled.nav`
  width: 100%;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 8vh;
`;
export const Logo = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 769px) {
    font-size: 1em;

    h3 {
      font-size: 1.4em;
    }
  }

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
  width: 80%;
  display: flex;
  align-self: center;
  margin: 0.8em 0;
  /* margin-right: 5%; */
  height: 100%;

  button {
    margin-left: 0.8em;
  }

  @media (max-width: 769px) {
    /* display: none; */

    button {
      width: 80px;
    }
  }
`;
export const Ul = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0.8em 0;

  @media (max-width: 769px) {
    .user {
      display: none;
    }
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
