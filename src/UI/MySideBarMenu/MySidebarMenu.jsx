import React, { useState } from 'react'
import classes from './MySidebarMenu.module.css'

const MySidebarMenu = () => {

    const [isHide, setIsHide] = useState(true);
    const toggler = () => {
        if (isHide) {
            setIsHide(false)
        } else {
            setIsHide(true)
        }
    }

  return (
    <div>
        <div style={{display:"flex", alignItems:"center", height:"40px", 
            marginRight:"20px", cursor:"pointer"}}
            onClick = {toggler}>
            <span className={classes.sideBarToggler}/>
        </div>
        <ul className={!(isHide === false)
            ? classes.sideBarMenu
            : [classes.sideBarMenu, classes.toggled].join(" ")}>
            <h3>Каталог</h3>
            <li>Какая то хуня</li>
            <li>Какая то хуня</li>
            <li>Какая то хуня</li>
            <li>Какая то хуня</li>
            <li>Какая то хуня</li>
            <li>Какая то хуня</li>
            <li>Какая то хуня</li>
            <li>Какая то хуня</li>
            <li>Какая то хуня</li>
            <li>Какая то хуня</li>
            <li>Какая то хуня</li>
            <li>Какая то хуня</li>
            <li>Какая то хуня</li>
        </ul>
    </div>
  )
}

export default MySidebarMenu