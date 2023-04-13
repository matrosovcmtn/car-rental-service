import React from 'react'
import MyHeader from '../UI/MyHeader/MyHeader'
import MyRentForm from '../UI/MyModalForms/MyRentForm'
import MyNavBar from '../UI/MyNavBar/MyNavBar'
import CarsList from '../components/CarsList/CarsList'

const MainPage = () => {
  return (
    <div>
        <MyHeader/>
        <MyRentForm/>
        <MyNavBar/>
        <CarsList/>
    </div>
  )
}

export default MainPage