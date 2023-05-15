import React, { useState } from 'react'
import { FaExclamationTriangle } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAddCar } from '../../redux/slices/cars'
import MyButton from '../MyButton/MyButton'
import classes from './MyModalAdd.module.css'
import { adminAuthSelector } from '../../redux/slices/adminAuth';

const MyModalUserAdd = ({activated, action}) => {

    const dispatch = useDispatch()

    const [cInf, setCInf] = useState({
        model_name: "",
        horse_powers: 0, 
        description: "" 
    })

    const [empty, setEmpty] = useState(null)

    const token = useSelector(adminAuthSelector).token

  return (
    <div className={activated ? classes.vis : classes.hid}>
        <form>
            <h2>Добавить автомобиль</h2>
            <label>Модель автомобиля:</label>
            <input type="text"
                value = {cInf.model_name}
                onChange = {(event) => setCInf(
                    {...cInf, model_name: event.target.value}
                )}
            />
            <label>Мощность:</label>
            <input type="number"
                value = {cInf.horse_powers}
                onChange = {(event) => setCInf(
                    {...cInf, horse_powers: event.target.value}
                )}
            />
            <label>Описание:</label>
            <textarea cols="30" rows="10"
                value = {cInf.description}
                onChange = {(event) => setCInf(
                    {...cInf, description: event.target.value}
                )}
            ></textarea>
            <div className={empty ? classes.unchWarn : classes.unchWarnHid}>
                <FaExclamationTriangle style={{margin: "5px", transform: "translateY(8px)"}}/>
                <span>Введите все необходимые данные!</span>
            </div>
            <MyButton text="Добавить" action={() => {
                if (cInf["model_name"] === "" ||
                    cInf["horse_powers"] === 0 ||
                    cInf["description"] === "") setEmpty(true)
                else {
                    dispatch(fetchAddCar(cInf, token))
                    setCInf({
                        model_name: "",
                        horse_powers: 0, 
                        description: "" 
                    })
                    setEmpty(null)
                    action(false)
                }
            }}/>
            <MyButton text="Отмена" action={() => {
                setCInf({
                    model_name: "",
                    horse_powers: 0, 
                    description: "" 
                })
                setEmpty(null)
                action(false)
            }}/>
        </form>
    </div>
  )
}

export default MyModalUserAdd