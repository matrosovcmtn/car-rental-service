import React from 'react'
import MySidebarMenu from '../MySideBarMenu/MySidebarMenu'
import classes from './MyHeader.module.css'
import { FaUserAlt } from 'react-icons/fa'

const MyHeader = () => {
  return (
    <div className={classes.header}>
        <div className={classes.navbar}>
          <MySidebarMenu/>
          <img src="./assets/logo.png" width="130px" alt='some_problem_occured'/>
        </div>
        <div className={classes.profile}>
          {/* <a href="#">
            <FontAwesomeIcon icon={faUserCircle} 
            style={{
              fontSize: "1.5em",
              padding: "px"
            }}/>
            Логин
          </a> */}
          <a type='tel' href="+79915374415">+7(991)537-44-15</a>
          <div style={{marginRight:"20px", display:"flex", alignItems:"center"}}>
            <FaUserAlt style={{fontSize:"1.7em", marginRight:"10px"}}/>
            <span>Вход /<br/>Регистрация</span>
          </div>
        </div>    
    </div>
  )
}

export default MyHeader