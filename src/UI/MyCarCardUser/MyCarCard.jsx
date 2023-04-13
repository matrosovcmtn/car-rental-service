import React from 'react'
import classes from "./MyCarCard.module.css"
import MyOrderButton from '../MyButton/MyOrderButton'

const MyCarCard = () => {
  return (
    <div className={classes.card}>
        <img src="./assets/granta.jpg" alt=""
            width="280px"/>
        <hr style={{width:"80%"}}/>
        <p>LadaGranta</p>
        <MyOrderButton value="Оформить"></MyOrderButton>
    </div>
  )
}

export default MyCarCard