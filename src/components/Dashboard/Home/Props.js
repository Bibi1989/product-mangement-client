import React from "react";
import { Icon, Dropdown } from "semantic-ui-react";
import { Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Prob, Date, Header } from "./style";

const Props = ({ project, handleEdit, handleDelete }) => {
  return (
    <Prob key={project.id}>
      <Header>
        <h1>{project.project_name}</h1>
        <Badge
          className='primary'
          pill
          variant={project.project_identifier === "public" ? "info" : "primary"}
        >
          {project.project_identifier}
        </Badge>
      </Header>
      <Link className='link' to={`/tasks/${project.id}`}>
        <p>{project.description}</p>
      </Link>
      <Date>
        <div>
          <span>Created: {project.start_date} -- </span>
          <span>Due: {project.end_date}</span>
        </div>
        <Dropdown icon='ellipsis vertical' floating labeled className='icon'>
          <Dropdown.Menu style={{ marginLeft: "-80px" }}>
            <Dropdown.Header icon='tags' content='Actions' />
            <Dropdown.Divider />
            <Dropdown.Item>
              <p onClick={() => handleEdit(project)}>
                <Icon name='edit' color='teal' /> Edit
              </p>
            </Dropdown.Item>
            <Dropdown.Item>
              <p onClick={() => handleDelete(project.id)}>
                <Icon name='cut' color='orange' /> Delete
              </p>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Date>
    </Prob>
  );
};

export default Props;
