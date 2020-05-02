import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { ProfilePic } from "../../NavBar/style";
import { Icon, Button } from "semantic-ui-react";

const Profile = () => {
  const user = JSON.parse(sessionStorage.getItem("project_user"));
  const history = useHistory();
  return (
    <Container>
      <Icon
        name='home'
        size='huge'
        style={{ marginBottom: "1em", color: "orangered" }}
        onClick={() => {
          history.push("/dashboard");
        }}
      />
      <ProfilePic>
        <h2 className='avatar'>
          {user.first_name[0].toUpperCase() + user.last_name[0].toUpperCase()}
        </h2>
        <div className='profile_contact'>
          <p>
            {user.first_name} {user.last_name}
          </p>
          <p>{user.email}</p>
          <p>{user.phone}</p>
        </div>
      </ProfilePic>
      <hr />
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae
        expedita quos voluptatibus rerum nihil ducimus nulla id. Aliquid
        suscipit cumque autem, deserunt sint quibusdam sed quaerat mollitia
        temporibus, aperiam ad?
      </p>
    </Container>
  );
};

export const Container = styled.div`
  padding: 5% 15%;

  @media (max-width: 769px) {
    padding: 2% 1em;
  }
`;

export default Profile;
