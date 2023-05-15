import React, { useState } from 'react'
import { FaExclamationTriangle } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAddUser } from '../../redux/slices/users'
import MyButton from '../MyButton/MyButton'
import classes from './MyModalAdd.module.css'
import { adminAuthSelector } from '../../redux/slices/adminAuth';

const MyModalUserAdd = ({activated, action}) => {

    const dispatch = useDispatch()

    const [uInf, setUInf] = useState({
        name: "",
        email: "",
        tel: "",
        username: "",
        age: ""
    })

    const [empty, setEmpty] = useState(null)

    
    const token = useSelector(adminAuthSelector).token

  return (
    <div className={activated ? classes.vis : classes.hid}>
        <form>
            <h2>Добавить пользователя</h2>
            <label htmlFor="uname"><span>Username:</span>
                <input id = "uname" type="text" placeholder="Sentmentl"
                    value={uInf.username}
                    onChange ={(event) => setUInf(
                        {...uInf, username: event.target.value}
                    )}
                />
            </label>
            <label htmlFor="name"><span>Name:</span>
                <input id = "name" type="text" placeholder="Khitrov Nikita"
                    value={uInf.name}
                    onChange ={(event) => setUInf(
                        {...uInf, name: event.target.value}
                    )}
                />
            </label>
            <label htmlFor="tel"><span>Phone:</span>
                <input id = "tel" type="tel" placeholder="89298439515"
                    value={uInf.tel}
                    onChange ={(event) => setUInf(
                        {...uInf, tel: event.target.value}
                    )}
                />
            </label>
            <label htmlFor="email"><span>E-mail:</span>
                <input id = "email" type="email" placeholder="hitrov.qazws@gmail.com"
                    value={uInf.email}
                    onChange ={(event) => setUInf(
                        {...uInf, email: event.target.value}
                    )}
                />
            </label>
            <label htmlFor="age">Укажите возраст:
                <input id='age' type="number" min="18" max="90" placeholder="18"
                    value={uInf.age}
                    onChange ={(event) => setUInf(
                        {...uInf, age: event.target.value}
                    )}
                />
            </label>
            <div className={empty ? classes.unchWarn : classes.unchWarnHid}>
                <FaExclamationTriangle style={{margin: "5px", transform: "translateY(8px)"}}/>
                <span >Введите все необходимые данные!</span>
            </div>
            <MyButton text="Добавить" action={() => {
                if (
                    uInf["name"] === "" ||
                    uInf["email"] === "" ||
                    uInf["tel"] === "" ||
                    uInf["username"] === "" ||
                    uInf["age"] === ""
                ) setEmpty(true)
                else {
                    dispatch(fetchAddUser(uInf, token))
                    setUInf({
                        name: "",
                        email: "",
                        tel: "",
                        username: "",
                        age: ""
                    })
                    setEmpty(null)
                    action(false)
                }
            }}/>
            <MyButton text="Отмена" action={() => {
                setUInf({
                    name: "",
                    email: "",
                    tel: "",
                    username: "",
                    age: ""
                })
                setEmpty(null)
                action(false)
            }}/>
        </form>
    </div>
  )
}

export default MyModalUserAdd