import React from 'react'
import classes from './MyOrderButton.module.css'
const MyOrderButton = ({value, action}) => {
  return (
    <button className={classes.btn}>{value}</button>
  )
}

export default MyOrderButton