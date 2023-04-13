import React from 'react'
import MyCarCard from '../../UI/MyCarCardUser/MyCarCard'
import classes from "./CarsList.module.css"
import MyInput from '../../UI/MyInput/MyInput'

const CarsList = () => {
  return (
    <div>
      <div className={classes.filters}>
        <input type="text" />
      </div>
      <div className={classes.list}>
        <MyCarCard/>
        <MyCarCard/>
        <MyCarCard/>
        <MyCarCard/>
        <MyCarCard/>
        <MyCarCard/>
        <MyCarCard/>
        <MyCarCard/>
        <MyCarCard/>
        <MyCarCard/>
        <MyCarCard/>
      </div>
    </div>
  )
}

export default CarsList