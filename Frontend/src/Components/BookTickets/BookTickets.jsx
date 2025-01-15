import React from 'react'
import PreLoader from '../PreLoader/PreLoader'
import SubNavbar from './SubNavbar/SubNavbar'
import Caraousel from './Caraousel/Caraousel'
import Footer from '../Footer/Footer'
import MovieCard  from './MovieCard/MovieCard'

const BookTickets = () => {
  return (
    <>
      <PreLoader />
      <SubNavbar />
      <section>
        <Caraousel />
      </section>
      <MovieCard/>
      <Footer />
    </>
  )
}

export default BookTickets