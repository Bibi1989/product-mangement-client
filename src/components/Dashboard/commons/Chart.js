import React from "react";
import { Col, Card } from "../Home/style";
import { Icon } from "semantic-ui-react";
import { Spinner } from "react-bootstrap";

const Chart = ({ projects, count, loading, invite }) => {
  const data = [
    {
      title: "Total Projects",
      icon: "chart bar",
      number: projects.length,
      loaded: loading,
      color: "teal",
    },
    {
      title: "Total Tasks",
      icon: "chart line",
      number: count,
      loaded: loading,
      color: "violet",
    },
    {
      title: "Total Collaborator",
      icon: "chart pie",
      number: invite,
      loaded: loading,
      color: "orangered",
    },
  ];

  return (
    <Col>
      {data.map(({ title, icon, number, loaded, color }) => (
        <Card color={color}>
          <p>{title}</p>
          <div className='total'>
            <Icon name={icon} color={color} />
            <div>
              {loaded ? (
                <Spinner animation='grow' variant='success' />
              ) : (
                <span>{number}</span>
              )}
            </div>
          </div>
        </Card>
      ))}
    </Col>
  );
};

export default Chart;
