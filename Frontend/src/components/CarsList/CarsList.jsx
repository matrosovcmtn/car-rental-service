import React, { useEffect, useRef } from 'react'
import MyCarCard from '../../UI/MyCarCardUser/MyCarCard'
import classes from "./CarsList.module.css"
import { useState } from 'react'
import { BiSearchAlt } from "react-icons/bi"
import MyCategorySelector from '../../UI/MyCatetgorySelector/MyCategorySelector'
import { useCarsFilter } from '../../customHooks/useCarsFilter'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectCarDetails, setCarDetails } from '../../redux/slices/carDetails'
import axios from 'axios'
import Cookies from 'universal-cookie'

const CarsList = () => {

  const searchLine = useRef()

  const cookies = new Cookies()

  const [filters, setFilters] = useState({
    category: [],
    query: ""
  })

  const [cars, setCars] = useState([])

  const [filtered,setFiltered] = useState([])

  const setCats = (value) => {
    if (filters.category.includes(value)) {
      setFilters({...filters, category: filters.category.filter(val => val !== value)})
    }
    else setFilters({...filters, category: [...filters.category, value]})
  }

  const get_cars = async () => {
    const {data} = await axios.get('http:/localhost:8088/cars', {
      headers: {
        "Authorization":"Bearer " + cookies.get("token")
      }
    })
    const filteredData = useCarsFilter(filters.category, filters.query, data)
    setFiltered(filteredData)
  }

  useEffect(() => {
    get_cars()
  }, [filters])

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
        {filtered.map((car, index) =>
          <Link key={index} className={classes.link} to={`/cur_car_page?id=${car.id}`}>
            <MyCarCard
                     id={car.id}
                     model={car.modelName}
                     horsePowers={car.horsePowers}
                     description={car.description}
                     category={car.category}
                     cost={car.price}/>
          </Link>)}
      </div>
    </div>
  )
}

export default CarsList