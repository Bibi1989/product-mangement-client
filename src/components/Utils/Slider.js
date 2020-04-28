import React from "react";
import Swiper from "react-id-swiper";
import styled from "styled-components";

const Slider = () => {
  const params = {
    slidesPerView: "auto",
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    spaceBetween: 30,
  };
  return (
    <Container>
      <h1>Tool For Efficient Working</h1>
      <Swiper {...params}>
        <Image>
          <img src='../../../assets/product.svg' alt='slides' />
        </Image>
        <Image>
          <img src='../../../assets/dev.svg' alt='slides' />
        </Image>
        <Image>
          <img src='../../../assets/product.svg' alt='slides' />
        </Image>
        <Image>
          <img src='../../../assets/dev.svg' alt='slides' />
        </Image>
      </Swiper>
    </Container>
  );
};

const Container = styled.div`
  max-height: 70vh;
  min-height: 40vh;
  padding: 3% 10%;
  width: 80%;
  margin: auto;

  .swiper-button-next,
  .swiper-button-prev {
    color: orangered;
    font-weight: 900;
    font-size: 1em;
  }
`;
const Image = styled.div`
  max-height: 60vh;
  min-height: 30vh;
  width: 100%;
  background: #888888;

  img {
    display: block;
    width: 70%;
    margin: auto;
  }
`;

export default Slider;
