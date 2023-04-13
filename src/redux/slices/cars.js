import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCars = createAsyncThunk("people/fetchCars", 
async (token) => {
    const {data} = await axios.get("http://localhost:8088/cars", 
    {headers: {
        "Authorization" : `Bearer ${token}`
    }});
    return data
})

export const fetchAddCar = createAsyncThunk("people/fetchAddCar", 
async (car, token) => {
    const {data} = await axios.post("http://localhost:8088/cars/register", car, 
    {headers: {
        "Authorization" : `Bearer ${token}`
    }});
    return data
})

export const fetchEditCar = createAsyncThunk("cars/fetchEditCar", 
async (car, token) => {
    const {data} = await axios.put("http://localhost:8088/cars", car, 
    {headers: {
        "Authorization" : `Bearer ${token}`
    }});
    return data
})

export const fetchRemoveCar = createAsyncThunk("people/fetchRemoveCar", 
async (id, token) => {
    await axios.delete(`http://localhost:8088/cars/${id}`, 
    {headers: {
        "Authorization" : `Bearer ${token}`
    }});
})


const carsSlice = createSlice({
    name: "cars",
    initialState: {
        cars: [],
        status: "loading"
    },
    reducers: {},
    extraReducers: {
        //Получаем автомобили с сервера
        [fetchCars.pending]: (state) => {
            state.users = []
            state.status = "loading"
        },
        [fetchCars.fulfilled]: (state, action) => {
            state.users = action.payload.sort((a,b) => a.id - b.id);
            state.status = "loaded"
        },
        [fetchCars.rejected]: (state) => {
            state.users = []
            state.status = "error"
        },

        //Добавляем автомобиль в бд на сервере
        [fetchAddCar.pending]: (state) => {
            state.status = "loading"
        },
        [fetchAddCar.fulfilled]: (state, action) => {
            state.users = [...state.users, action.payload]
                .sort((a,b) => a.id - b.id);
            state.status = "loaded"
        },
        [fetchAddCar.rejected]: (state) => {
            state.users = []
            state.status = "error"
        },

        //Изменяем автомобиль
        [fetchEditCar.pending]: (state) => {
            state.status = "loading"
        },
        [fetchEditCar.fulfilled]: (state, action) => {
            state.users = 
            [...state.users
                .filter((user) => user.id !== action.payload.id),
                    action.payload].sort((a,b) => a.id - b.id)
            state.status = "loaded"
        },
        [fetchEditCar.rejected]: (state) => {
            state.users = []
            state.status = "error"
        },

        //Удаляем автомобиль
        [fetchRemoveCar.pending]: (state) => {
            state.status = "loading"
        },
        [fetchRemoveCar.fulfilled]: (state, action) => {
            state.users = [...state.users
                .filter((user) => user.id !== action.meta.arg)]
                    .sort((a,b) => a.id - b.id)
            console.log(action)
            state.status = "loaded"
        },
        [fetchRemoveCar.rejected]: (state) => {
            state.users = []
            state.status = "error"
        }
    }
});


export const selectCars = (state) => state.cars.cars
export const carsReducer = carsSlice.reducer