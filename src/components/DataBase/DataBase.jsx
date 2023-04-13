import React, { useEffect, useState } from 'react'
import { useSearchedSortedData } from '../../customHooks/useDataFilter.js'
import { useDispatch, useSelector } from 'react-redux';
import MyUserCard from '../../UI/MyItemCardAdm/MyUserCard.jsx';
import { selectTypeDB } from '../../redux/slices/DBs';
import { fetchUsers, selectUsers } from '../../redux/slices/users';
import MyButton from '../../UI/MyButton/MyButton';
import MySelect from '../../UI/MySelect/MySelect';
import MyModalUserAdd from '../../UI/MyModalForms/MyModalUserAdd';
import MyInput from '../../UI/MyInput/MyInput.jsx';
import { fetchCars, selectCars } from '../../redux/slices/cars.js';
import MyModalCarAdd from '../../UI/MyModalForms/MyModalCarAdd.jsx';
import MyCarCard from '../../UI/MyItemCardAdm/MyCarCard.jsx';
import { adminAuthSelector } from '../../redux/slices/adminAuth';

const DataBase = () => {
  const type = useSelector(selectTypeDB)

  const dispatch = useDispatch()
  
  const [isAdding, setIsAdding] = useState(false)

  const [filter, setFilter] = useState({sortBy: type === "people" ? "id" : "car_id" , query: ""})


  const token = useSelector(adminAuthSelector).token
  
  useEffect(() => {
    if (type === "people") dispatch(fetchUsers(token))
    else if (type === "cars") dispatch(fetchCars(token))
  }, [])
  
  const DBcont = useSearchedSortedData(type === "people" ? useSelector(selectUsers) : useSelector(selectCars), filter.sortBy, filter.query)

  return (
    <div>
      {type === "people"
        ? <div>
            <MyInput
              value = {filter.query}
              type = "text"
              placeholder = "Поиск клиента..."
              onChange = {(event) => setFilter({...filter, query: event.target.value})}
            />
            <div  style={{display: "flex", alignItems: "center", padding: "4px"}}>
              <MySelect
                value = {filter.sortBy}
                defaultValue = {"Сортировка по"}
                options = {[
                  {value: "name", name: "По ФИО"},
                  {value: "username", name: "По логину"},
                  {value: "email", name: "По Email"}
                ]}
                onChange = {sortType => setFilter({...filter, sortBy: sortType})}
              />
              <MyButton
                text = {"Добавить пользователя"}
                action = {() => {
                  setIsAdding(true)
                }}
              />
            </div>
            <MyModalUserAdd activated = {isAdding} action = {setIsAdding}/>
            {DBcont.map(user => <MyUserCard key = {user.id} user = {user}/>)}
          </div>
        : <div>
          <MyInput
              value = {filter.query}
              type = "text"
              placeholder = "Поиск авто..."
              onChange = {(event) => setFilter({...filter, query: event.target.value})}
            />
            <div  style={{display: "flex", alignItems: "center", padding: "4px"}}>
              <MySelect
                value = {filter.sortBy}
                defaultValue = {"Сортировка по"}
                options = {[
                  {value: "model_name", name: "По модели"},
                  {value: "horse_powers", name: "По мощности"}
                ]}
                onChange = {sortType => setFilter({...filter, sortBy: sortType})}
              />
              <MyButton
                text = {"Добавить автомобиль"}
                action = {() => {
                  setIsAdding(true)
                }}
              />
            </div>
            <MyModalCarAdd activated = {isAdding} action = {setIsAdding}/>
            {DBcont.map(car => <MyCarCard key = {car.car_id} car = {car}/>)}
        </div>
      }
    </div>
  )
}

export default DataBase