import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchEditUser } from '../../redux/slices/users'
import MyButton from '../MyButton/MyButton'
import { FaExclamationTriangle } from "react-icons/fa"
import classes from './MyModalEd.module.css'
import { adminAuthSelector } from '../../redux/slices/adminAuth';

const MyModalUserEd = ({activated, action, user}) => {

  const dispatch = useDispatch(fetchEditUser(user))

  const [unchanged, setUnchanged] = useState(null)

  const [uInf, setUInf] = useState({
    email: user.email,
    tel: user.tel,
    username: user.username
  })

  const token = useSelector(adminAuthSelector).token

  return (
    <div className={activated ? classes.vis : classes.hid}>
        <form>
                <h1>{user.id}. {user.name}</h1>
                <label>Username:</label>
                <input placeholder="Username"
                  value = {uInf.username}
                  onChange = {(event) => {
                    setUInf({...uInf, username: event.target.value})
                  }}
                />
                <label>E-mail:</label>
                <input placeholder="E-mail"
                  value = {uInf.email}
                  onChange = {(event) => {
                    setUInf({...uInf, email: event.target.value})
                  }}
                />
                <label>Phone number:</label>
                <input type="tel" placeholder="Phone"
                  value = {uInf.tel}
                  onChange = {(event) => {
                    setUInf({...uInf, tel: event.target.value})
                  }}
                />
                <div className={unchanged ? classes.unchWarn : classes.unchWarnHid}>
                  <FaExclamationTriangle style={{margin: "5px", transform: "translateY(8px)"}}/>
                  <span style={{margin: "5px"}}>Проверьте введенные данные!</span>
                </div>
                
                <MyButton text='Сохранить изменения' action={() => {
                    const newInf = {
                      ...user,
                      ...uInf
                    }
                    if (JSON.stringify(newInf) !== JSON.stringify(user) &&
                        newInf["name"] !== "" &&
                        newInf["email"] !== "" &&
                        newInf["tel"] !== "" &&
                        newInf["username"] !== "" &&
                        newInf["age"] !== "") 
                    {
                      dispatch(fetchEditUser(newInf, token))
                      action(false)
                    }
                    else setUnchanged(true)
                  }
                }/>
                
                <MyButton text='Отмена' action={() => {
                    setUInf({
                      email: user.email,
                      tel: user.tel,
                      username: user.username
                    })
                    setUnchanged(null)
                    action(false)
                  }
                }/>
        </form>
    </div>
  )
}

export default MyModalUserEd