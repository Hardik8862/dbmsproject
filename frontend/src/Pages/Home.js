import React from 'react'
import { Link } from 'react-router-dom'
import {Button} from '@mui/material'
import { useNavigate } from 'react-router-dom'

function Home() {

  const navigate = useNavigate();

  const RedirecttoCustomer = () => {
    navigate("/customer");
  }

  return (
    <>
      <Button variant="outlined" onClick={RedirecttoCustomer}>Customer</Button>
      <Button variant="outlined" onClick={() => navigate("/platform")}>Platform</Button>
    </>
  )
}

export default Home