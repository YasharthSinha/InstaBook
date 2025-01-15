import React, { useEffect, useRef } from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from '../Navbar';
import "./HomePage.css";
import CinemaImg from "../../images/Popcorn-cola-tickets-cinema-background-vector.jpg"
import PreLoader from '../PreLoader/PreLoader';
import gsap from 'gsap';
import Footer from '../Footer/Footer';
import Scroller from './Scroller/Scroller';
const HomePage = () => {
  const content1=useRef(null);
  const content2=useRef(null);
  const content3=useRef(null);
  useEffect(()=>{
    gsap.fromTo(content1.current, {scale:0.5},{scale:1,duration:2,delay:0.5}
    );
    gsap.fromTo(content2.current, {scale:0.5},{scale:1,duration:2,delay:0.5}
    );
    gsap.fromTo(content3.current, {scale:0.5},{scale:1,duration:2,delay:0.5}
    )
  },[]);
  return (
    <>
      <PreLoader></PreLoader>
      <section><Navbar/></section>
      <div class="cont">
        <Container fluid className="mt-20 text-center h-full">
          <Row className="g-2 justify-center">
            <Col xs={12} sm={6} md={4} lg={4} xl={4}>
              <Card ref={content1} className="h-100">
                <Card.Img variant="top" src={CinemaImg} alt="img" />
                <Card.Body>
                  <Card.Title>Movie/Shows/Concerts</Card.Title>
                  <Card.Text>
                    For Tickets of latest movies/shows/concerts and more
                  </Card.Text>
                  <button class="button-40" role="button">
                    <span class="text"><a href='/booktickets'>Book Now</a></span>
                  </button>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} sm={6} md={4} lg={4} xl={4}>
              <Card ref={content2} className="h-100">
                <Card.Img variant="top" src={CinemaImg} alt="img" />
                <Card.Body>
                  <Card.Title>Regional</Card.Title>
                  <Card.Text>
                    For regional theaters
                  </Card.Text>
                  <button class="button-40" role="button">
                    <span class="text">Book Now</span>
                  </button>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} sm={6} md={4} lg={4} xl={4}>
              <Card ref={content3} className="h-100">
                <Card.Img variant="top" src={CinemaImg} alt="img" />
                <Card.Body>
                  <Card.Title>Videos/Trailers</Card.Title>
                  <Card.Text>
                    To watch latest trailers and what's trending
                  </Card.Text>
                  <button class="button-40" role="button">
                    <span class="text"><a href='/videos'>Watch</a></span>
                  </button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
      <div className='pt-10'><Scroller/></div>
      <section className='fot'><Footer/></section>
    </>
  );
};

export default HomePage;
