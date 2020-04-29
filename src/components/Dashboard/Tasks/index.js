import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

const Tasks = () => {
  // const tasks = useSelector(({ project: { tasks } }) => tasks);
  // console.log({ tasks });
  return (
    <Container>
      <Row>
        <Col>
          <h1>Start</h1>
          <input type='text' placeholder='Enter task' />
          <Task>
            <Display>
              <p>Lorem ipsum dolor sit amet.</p>
              <p>Lorem ipsum dolor sit.</p>
              <div className='status'>
                <p>mild</p>
                <p>2020-05-29</p>
              </div>
            </Display>
            <Display>
              <p>Lorem ipsum dolor sit amet.</p>
              <p>Lorem ipsum dolor sit.</p>
              <div className='status'>
                <p>mild</p>
                <p>2020-05-29</p>
              </div>
            </Display>
          </Task>
        </Col>
        <Col>
          <h1>Review</h1>
          <Task>
            <Display>
              <p>Lorem ipsum dolor sit amet.</p>
              <p>Lorem ipsum dolor sit.</p>
              <div className='status'>
                <p>mild</p>
                <p>2020-05-29</p>
              </div>
            </Display>
          </Task>
        </Col>
        <Col>
          <h1>Finish</h1>
          <Task>
            <Display>
              <p>Lorem ipsum dolor sit amet.</p>
              <p>Lorem ipsum dolor sit.</p>
              <div className='status'>
                <p>2020-05-29</p>
                <p>mild</p>
              </div>
            </Display>
          </Task>
        </Col>
      </Row>
    </Container>
  );
};

export default Tasks;

export const Container = styled.div`
  padding: 5% 10%;
  background: #f9fbfc;
`;
export const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 2em;
`;
export const Col = styled.div`
  padding: 1em;
  background: #ffffff;
  border-radius: 0.25em;
  box-shadow: 0 0 15px solid #999;

  h1 {
    padding-bottom: 1em;
    color: teal;
  }

  input {
    border: 1px solid orangered;
    padding: 0.8em;
    border-radius: 0.3em;
    outline: none;
    margin-bottom: 0.8em;
  }

  p {
    padding: 0;
    margin: 0;
  }
`;
export const Display = styled.div`
  padding: 0.8em;
  background: #f4f4f4;
  margin-bottom: 0.8em;

  .status {
    display: flex;
    justify-content: space-between;
  }
`;

export const Task = styled.div`
  min-height: 30vh;
  max-height: 40vh;
  overflow-y: auto;
`;
