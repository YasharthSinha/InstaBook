import React from 'react'
import './Caraousel.css';
import { Carousel } from "flowbite-react";
const Caraousel = () => {
  return (
    <div className="relative h-screen object-cover" >
    <Carousel>
      <img src="https://assets-in.bmscdn.com/promotions/cms/creatives/1726232674589_karanaujlaweb.jpg" alt="..." />
      <img src="https://assets-in.bmscdn.com/promotions/cms/creatives/1726036566435_playcardnewweb.jpg" alt="..." />
      <img src="https://cinepolisindia.com/_next/image?url=https%3A%2F%2Fcinepolisindia-prod-2.s3.ap-south-1.amazonaws.com%2Fuploads%2Fimages%2Fbanners%2F1719487219632blob.webp&w=1200&q=75" alt="..." />
      <img src="https://cinepolisindia.com/_next/image?url=https%3A%2F%2Fcinepolisindia-prod-2.s3.ap-south-1.amazonaws.com%2Fuploads%2Fimages%2Fbanners%2F1711964013224blob.png&w=1200&q=75" alt="..." />
      <img src="https://assets-in.bmscdn.com/promotions/cms/creatives/1726692793350_revisedcoldplaymoftswt1240x300.jpg" alt="..." />
    </Carousel>
  </div>
  )
}

export default Caraousel