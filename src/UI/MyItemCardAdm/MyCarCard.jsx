import React, { useState } from 'react'
import classes from './MyItemCard.module.css'
import MyButton from '../MyButton/MyButton'
import { useDispatch, useSelector } from 'react-redux'
import { fetchRemoveCar } from '../../redux/slices/cars'
import MyModalCarEd from '../MyModalForms/MyModalCarEd'
import { adminAuthSelector } from '../../redux/slices/adminAuth';

const MyCarCard = ({car}) => {

    const [isEditing, setIsEditing] = useState(false)

    const dispatch = useDispatch()
    
    const token = useSelector(adminAuthSelector).token

    return (
        <div className={classes.card}>
            <h1>{car.id}. {car.name}</h1>
            <label htmlFor="name">Марка и модель авто:</label>
            <input disabled id = "name" placeholder={car.username}/>
            <label >Описание автомобиля:</label>
            <textarea cols="30" rows="10">{car.description}</textarea>
            <MyModalCarEd activated = {isEditing} action = {setIsEditing} car = {car}/>
            <MyButton
                text = {"Изменить"}
                action = {() => {setIsEditing(true)}}
            />
            <MyButton
                text = {"Удалить"}
                action = {() => {dispatch(fetchRemoveCar(car.car_id, token))}}
            />
        </div>
  )
}

export default MyCarCard