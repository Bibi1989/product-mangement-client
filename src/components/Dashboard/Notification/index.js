import React from "react";
import { useSelector } from "react-redux";
import { Table } from "semantic-ui-react";
import styled from "styled-components";

const Collaborator = () => {
  let projects = useSelector(({ project: { projects } }) => projects) || [];
  let collaborate_projects = projects.filter(
    (collaborate) => collaborate.userArray.length > 1
  );
  let user = JSON.parse(sessionStorage.getItem("project_user"));
  console.log(collaborate_projects);
  return (
    <Container>
      <Row>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Projects Name</Table.HeaderCell>
              <Table.HeaderCell>Admin Name</Table.HeaderCell>
              <Table.HeaderCell>Collaborators</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {collaborate_projects.map((collaborate) => (
              <Table.Row key={collaborate.id}>
                <Table.Cell>{collaborate.project_name}</Table.Cell>
                <Table.Cell>
                  {collaborate.User.first_name === user.first_name
                    ? "Me"
                    : `${collaborate.User.first_name} ${collaborate.User.last_name}`}
                </Table.Cell>
                <Table.Cell>{collaborate.description}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Row>
    </Container>
  );
};

export const Container = styled.div`
  margin: 3% 0;
`;
export const Row = styled.div``;

export default Collaborator;
