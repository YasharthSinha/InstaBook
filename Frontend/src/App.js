import './App.css';
import Navbar from './Components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './Components/HomePage/HomePage';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import BookTickets from './Components/BookTickets/BookTickets';
import VideoHome from './Components/VideoSection/VideoHome';
import LogSign from './Components/LogSign/LogSign';
import ErrorPage from './Components/Pages/ErrorPage';
import MoviePage from './Components/BookTickets/MoviePage/MoviePage';
import PaymentPage from './Components/BookTickets/PaymentPage/PaymentPage';
import PaymentSuccess from './Components/BookTickets/PaymentSuccess/PaymentSuccess';


function App() {
  return (
    <>
          <Routes>
              <Route path="/" element={<HomePage/>}/>
              <Route path='/booktickets' element={<BookTickets/>}/>
              <Route path='/videos' element={<VideoHome/>}/>
              <Route path='/logsign' element={<LogSign/>}/>
              <Route path="/movie" element={<MoviePage />} />
              <Route path="/payment" element={<PaymentPage />} />
              <Route path="/payment-success" element={<PaymentSuccess />}/>
              <Route path='*' element={<ErrorPage/>}/>
          </Routes>
    </>
  );
}

export default App;
