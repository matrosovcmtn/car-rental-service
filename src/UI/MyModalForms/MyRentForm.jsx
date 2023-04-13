import React, { useState } from 'react'
import MyInput from '../MyInput/MyInput'
import MySelect from '../MySelect/MySelect'
import classes from './MyRentForm.module.css'
import MyOrderButton from '../MyButton/MyOrderButton'

const MyRentForm = () => {
    
    const [info, setInfo] = useState({
        user: "",
        number: "",
        email: "",
        carId: "Выберите машину",
        date: "",
        exp: null
    })

    return (
        <div>
            <form className={classes.form}>
                <MyInput
                    value = {info.user}
                    type = "text"
                    placeholder = "ФИО"
                    onChange = {event => setInfo({...info, user: event.target.value})}
                />
                <MyInput
                    value = {info.date}
                    type = "text"
                    placeholder = "Дата аренды"
                    onChange = {event => setInfo({...info, date: event.target.value})}
                />
                <MyInput
                    value = {info.number}
                    type = "text"
                    placeholder = "Телефон"
                    onChange = {event => setInfo({...info, number: event.target.value})}
                />
                <MyInput
                    value = {info.email}
                    type = "text"
                    placeholder = "Email"
                    onChange = {event => setInfo({...info, email: event.target.value})}
                />
                <MySelect
                    value = {info.carId}
                    options = {[
                        {id: 1, model: "first"},
                        {id: 2, model: "second"},
                        {id: 3, model: "third"}
                    ]}
                    defaultValue = {"Выбрать машину"}
                    onChange = {car => setInfo({...info, carId: car})}                
                />
                <MyOrderButton value="Оставить заявку"/>
            </form>
        </div>
    )
}

export default MyRentForm