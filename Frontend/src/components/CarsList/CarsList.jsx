import React, { useEffect, useRef } from 'react'
import MyCarCard from '../../UI/MyCarCardUser/MyCarCard'
import classes from "./CarsList.module.css"
import data from '../../localDataBase/cars.json'
import { useState } from 'react'
import { BiSearchAlt } from "react-icons/bi"
import MyCategorySelector from '../../UI/MyCatetgorySelector/MyCategorySelector'
import { useCarsFilter } from '../../customHooks/useCarsFilter'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectCarDetails, setCarDetails } from '../../redux/slices/carDetails'

const CarsList = () => {

  const searchLine = useRef()

  const [filters, setFilters] = useState({
    category: [],
    query: ""
  })

  const setCats = (value) => {
    if (filters.category.includes(value)) {
      setFilters({...filters, category: filters.category.filter(val => val !== value)})
    }
    else setFilters({...filters, category: [...filters.category, value]})
  }

  const newData = useCarsFilter(filters.category, filters.query, data)

  const dispatch = useDispatch()

  return (
    <div>
      <div className={classes.filters}>
        <div className={classes.search}>
          <label htmlFor="query">Поиск:</label>
          <div>
            <input ref={searchLine} name="query"type="text" placeholder='Запрос...'/>
            <button onClick={() => setFilters({...filters, query: searchLine.current.value})}><BiSearchAlt/></button>
          </div>
        </div>
        <div className={classes.category}>
          <span>Классы:</span>
          <MyCategorySelector value={"Эконом"}
            action={() => setCats("Эконом")}/>
          <MyCategorySelector value={"Стандарт"}
            action={() => setCats("Стандарт")}/>
          <MyCategorySelector value={"Бизнес"}
            action={() => setCats("Бизнес")}/>
          <MyCategorySelector value={"Премиум"}
            action={() => setCats("Премиум")}/>
          <MyCategorySelector value={"Минивен"}
            action={() => setCats("Минивен")}/>
          <MyCategorySelector value={"Кроссовер"}
            action={() => setCats("Кроссовер")}/>
          <MyCategorySelector value={"Внедорожник"}
            action={() => setCats("Внедорожник")}/>
        </div>
      </div>
      <div className={classes.list}>
        {newData.map((car, index) =>
          <Link key={index} className={classes.link} to={`/cur_car_page?id=${index + 1}`}>
            <MyCarCard key={index}
                     model={car.model}
                     category={car.category}
                     cost={car.cost}/>
          </Link>)}
      </div>
    </div>
  )
}

export default CarsList