import React from "react";
import { Col, Card } from "../Home/style";
import { Icon } from "semantic-ui-react";
import { Spinner } from "react-bootstrap";
import { useCallback } from "react";

const Chart = ({ projects, count, loading }) => {
  const data = [
    {
      title: "Total Projects",
      icon: "chart bar",
      number: projects.length,
      loaded: loading,
    },
    {
      title: "Total Tasks",
      icon: "chart line",
      number: count,
      loaded: loading,
    },
    { title: "Total Likes", icon: "chart pie", number: 3, loaded: loading },
  ];

  console.log({ loading });

  return (
    <Col>
      {data.map(({ title, icon, number, loaded }) => (
        <Card>
          <p>{title}</p>
          <div className='total'>
            <Icon name={icon} />
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
