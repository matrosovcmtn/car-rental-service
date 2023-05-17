import React from 'react'
import { useLocation, withRouter } from "react-router-dom";
import classes from './CarDetails.module.css'
import {FaExclamationTriangle} from 'react-icons/fa'
import MyRentForm from '../../UI/MyModalForms/MyRentForm';
import axios from 'axios';

const CarDetails = () => {
  const query = new URLSearchParams(useLocation().search);
  const id = query.get('id')

  const [carDets, setCarDets] = useState({})

  const get_car_details = async () => {
    const {data} = await axios.get(`http://localhost:8088/cars/${id}`)
    setCarDets(data)
  }

  return (
    <div className={classes.dets}>
        <div className={classes.gallery}>
          <img src="./assets/granta.jpg" />
        </div>
        <div className={classes.desc}>
          <h1>{data.model}</h1>
          <p>Класс автомобиля: <i>{data.category}</i></p>
          <p>Стоимость: <i>{data.cost} руб./сутки</i></p>
          <h3>Описание:</h3>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi dolores fugiat rerum optio aliquid omnis consequatur, praesentium, eligendi quos beatae, consequuntur quidem itaque ad doloremque placeat nisi laborum quis numquam.</p>
        </div>
        <div className={classes.chars}>
          <h3>Характеристики:</h3>
          <p><b>Объем двигателя:</b> 1.6л</p>
          <p><b>Мультимедиа:</b> Аудиосистема (FM, USB, SD-карта, Bluetooth, Hands free)</p>
          <p><b>Привод:</b> Передний</p>
          <p><b>Салон:</b> Ткань черная</p>
          <p><b>Мощность двигателя:</b> 90 л.с.</p>
          <p><b>Камера заднего вида:</b> Нет</p>
          <p><b>Парктроники:</b> Нет</p>
          <p><b>Кондиционер:</b> Да</p>
        </div>
        <div className={classes.reqs}>
          <h3><FaExclamationTriangle style={{transform: "translateY(20%)"}} fontSize="1.5em"/> Требования к арендатору:</h3>
          <ul>
            <li><b>Автомобили классов <i>Эконом</i> и <i>Стандарт</i> : </b>возраст от 20 лет и стаж вождения не менее 1 года</li>
            <li><b>Остальные классы автомобилей : </b>возраст от 23 лет и стаж вождения не менее 2-х лет</li>
          </ul>
          <h3><FaExclamationTriangle style={{transform: "translateY(20%)"}} fontSize="1.5em"/> Необходимые документы:</h3>
          <ul>
            <li><b>Паспорт</b></li>
            <li><b>Водительское удостоверение</b></li>    
            <li><b>Именная банковская карта</b></li>  
          </ul>   
        </div>
        <MyRentForm/>
    </div>
  )
}

export default CarDetails