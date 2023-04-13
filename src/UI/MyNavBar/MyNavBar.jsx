import React from 'react'
import classes from "./MyNavbar.module.css"

const MyNavBar = () => {
  return (
    <div className={classes.navbar}>
        <div>Автомобили</div>
        <div>Тарифы</div>
        <div>Условия аренды</div>
        <div>О компании</div>
        <div>FAQ</div>
    </div>
  )
}

export default MyNavBar