import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchEditUser } from '../../redux/slices/users'
import MyButton from '../MyButton/MyButton'
import { FaExclamationTriangle } from "react-icons/fa"
import classes from './MyModalEd.module.css'
import { fetchEditCar } from '../../redux/slices/cars'
import { adminAuthSelector } from '../../redux/slices/adminAuth'

const MyModalCarEd = ({activated, action, car}) => {

  const dispatch = useDispatch(fetchEditCar(car))

  const [unchanged, setUnchanged] = useState(null)

  const [cInf, setCInf] = useState({
        description: car.description
    })

  const token = useSelector(adminAuthSelector).token

  return (
    <div className={activated ? classes.vis : classes.hid}>
        <form>
                <textarea cols="30" rows="10"
                    value={cInf.description}
                    onChange = {(event) => setCInf(...cInf, event.target.value)}
                ></textarea>
                <div className={unchanged ? classes.unchWarn : classes.unchWarnHid}>
                  <FaExclamationTriangle style={{margin: "5px", transform: "translateY(8px)"}}/>
                  <span style={{margin: "5px"}}>Проверьте введенные данные!</span>
                </div>
                
                <MyButton text='Сохранить изменения' action={() => {
                    const newInf = {
                      ...car,
                      ...cInf
                    }
                    if (JSON.stringify(newInf) !== JSON.stringify(car) &&
                        newInf["description"] !== "")
                    {
                      dispatch(fetchEditUser(newInf, token))
                      action(false)
                    }
                    else setUnchanged(true)
                  }
                }/>
                
                <MyButton text='Отмена' action={() => {
                    setCInf({
                        description:""
                    })
                    setUnchanged(null)
                    action(false)
                  }
                }/>
        </form>
    </div>
  )
}

export default MyModalCarEd