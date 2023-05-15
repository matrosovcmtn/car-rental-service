import React from 'react'
import MyHeader from '../../UI/MyHeader/MyHeader'
import MyNavBar from '../../UI/MyNavBar/MyNavBar'
import MySlider from '../../UI/MySlider/MySlider'
import MyFooter from '../../UI/MyFooter/MyFooter'
import CarsList from '../../components/CarsList/CarsList'
import classes from './MainPage.module.css'

const MainPage = () => {
  return (
    <div className={classes.main}>
        <MyHeader/>
        <MySlider/>
        <MyNavBar/>
        <CarsList/>
        <MyFooter/>
    </div>
  )
}

export default MainPage