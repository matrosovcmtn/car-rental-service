import React from 'react'
import classes from "./MyCarCard.module.css"
import { useSelector } from 'react-redux'
import { selectCarDetails } from '../../redux/slices/carDetails'
import { useEffect } from 'react'

const MyCarCard = ({id, model, horsePowers, description, category, cost}) => {
  return (
    <div className={classes.card}>
        <img src="./assets/granta.jpg" alt=""
            width="230px"/>
        <hr style={{width:"80%"}}/>
        <p>{model}</p>
        <button className={classes.btn}>от {cost} руб/сутки</button>
    </div>
  )
}

export default MyCarCard