import React from 'react'
import Navbar from '../components/navigation/Navbar';

const NotFoundPage = () => {
  return (
    <Navbar>
      <div>
        <h1>404 - Page Not Found</h1>
        <p>Sorry, the page you are looking for does not exist.</p>
        <a href='/'>Go Back Home</a>
      </div>
    </Navbar>
  )
}

export default NotFoundPage
