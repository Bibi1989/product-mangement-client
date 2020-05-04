import React from "react";
import { Col, Card } from "./style";
import { Icon } from "semantic-ui-react";

const Chart = () => {
  return (
    <Col>
      <Card>
        <p>Total Projects</p>
        <div className='total'>
          <Icon name='chart bar' />
          <span>{projects !== undefined && projects.length}</span>
        </div>
      </Card>
      <Card>
        <p>Total Tasks</p>
        <div className='total'>
          <Icon name='chart line' />
          <span>{0}</span>
        </div>
      </Card>
      <Card>
        <p>Total Likes</p>
        <div className='total'>
          <Icon name='chart pie' />
          <span>3</span>
        </div>
      </Card>
    </Col>
  );
};

export default Chart;
