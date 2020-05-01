import React, { useState } from "react";
import styled from "styled-components";
import { Carousel, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const SlidingComponent = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Div>
      <Container>
        <Carousel
          activeIndex={index}
          onSelect={handleSelect}
          style={{ background: "#f4f4f4" }}
        >
          <Carousel.Item>
            <img
              className='d-block w-100'
              src='../../../../assets/dev.svg'
              alt='Second slide'
              width='100%'
              height='500'
            />
            <Carousel.Caption>
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className='d-block w-100'
              src='../../../../assets/product.svg'
              alt='Second slide'
              width='100%'
              height='500'
            />

            <Carousel.Caption>
              <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className='d-block w-100'
              src='../../../../assets/dev.svg'
              alt='Second slide'
              width='100%'
              height='500'
            />

            <Carousel.Caption>
              <h3>Third slide label</h3>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </Container>
    </Div>
  );
};

const Div = styled.div`
  .carousel-control-prev-icon {
    &.sr-only {
      background-color: orangered !important;
    }
  }
`;

export default SlidingComponent;
