import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  padding: 0 10%;

  @media (max-width: 769px) {
    padding: 0;
  }
`;
export const Navs = styled.nav`
  width: 95%;
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

  .icon {
    position: relative;

    .notice {
      margin-left: -80px;
      max-width: 220px;
      min-width: 200px;
      max-height: 400px;
      position: absolute;
      left: -100%;
      right: 10%;
      overflow: auto;

      &::-webkit-scrollbar {
        width: 3px;
        background-color: #ffffff;
      }

      &::-webkit-scrollbar-thumb {
        padding: 0 0.3em;
        width: 3px;
        background-color: #f9fbfc;
      }
    }
    i {
      font-size: 2em;
      color: teal;
    }
  }

  .user {
    cursor: pointer;
    h2 {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: #f9fbfc;
      font-size: 1.3em;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 0.8em;
    }
  }

  @media (max-width: 769px) {
    .user {
      /* display: none; */
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
    padding: 0.8em 1.2em;
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
export const Notification = styled.div`
  p {
    padding: 1em !important;
    border-bottom: 1px solid #f9fbfc !important;
  }
`;
export const ProfilePic = styled.div`
  display: flex;

  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: linen;
    font-size: 1.3em;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0.8em 1em;
  }

  .profile_contact {
    align-self: center;
    padding-right: 2em;

    p {
      margin: 0;
      padding: 0.1em 0;
    }
  }
`;
export const Buttons = styled.button``;
// export const Container = styled.div``
