import React, { useState } from 'react'
import classes from './MyItemCard.module.css'
import MyButton from '../MyButton/MyButton'
import { useDispatch, useSelector } from 'react-redux'
import { fetchRemoveUser } from '../../redux/slices/users'
import MyModalUserEd from '../MyModalForms/MyModalUserEd'
import { adminAuthSelector } from '../../redux/slices/adminAuth';

const MyUserCard = ({user}) => {

    const [isEditing, setIsEditing] = useState(false)

    const dispatch = useDispatch()

    const token = useSelector(adminAuthSelector).token

    return (
        <div className={classes.card}>
            <h1>{user.id}. {user.name}</h1>
            <label htmlFor="name">Username:</label>
            <input disabled id = "name" placeholder={user.username}/>
            <label htmlFor="email">E-mail:</label>
            <input disabled id = "email" placeholder={user.email}/>
            <label htmlFor="tel">Phone number:</label>
            <input disabled id = "tel" placeholder={user.tel}/>
            <MyModalUserEd activated = {isEditing} action = {setIsEditing} user = {user}/>
            <MyButton
                text = {"Изменить"}
                action = {() => {setIsEditing(true)}}
            />
            <MyButton
                text = {"Удалить"}
                action = {() => {dispatch(fetchRemoveUser(user.id, token))}}
            />
        </div>
  )
}

export default MyUserCard