import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUsers = createAsyncThunk("people/fetchUsers", 
async (token) => {
    const {data} = await axios.get("http://localhost:8088/people",
    {headers: {
        "Authorization" : `Bearer ${token}`
    }});
    return data
})

export const fetchAddUser = createAsyncThunk("people/fetchAddUsers", 
async (user, token) => {
    const {data} = await axios.post("http://localhost:8088/people/register", user, 
    {headers: {
        "Authorization" : `Bearer ${token}`
    }});
    return data
})

export const fetchEditUser = createAsyncThunk("people/fetchEditUser", 
async (user, token) => {
    const {data} = await axios.put("http://localhost:8088/people", user, 
    {headers: {
        "Authorization" : `Bearer ${token}`
    }});
    return data
})

export const fetchRemoveUser = createAsyncThunk("people/fetchRemoveUser", 
async (id, token) => {
    await axios.delete(`http://localhost:8088/people/${id}`, 
    {headers: {
        "Authorization" : `Bearer ${token}`
    }});
})

const initialState = {
    users: [],
    status: "loading"
}

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: {
        //Получаем пользователей с сервера
        [fetchUsers.pending]: (state) => {
            state.users = []
            state.status = "loading"
        },
        [fetchUsers.fulfilled]: (state, action) => {
            state.users = action.payload.sort((a,b) => a.id - b.id);
            state.status = "loaded"
        },
        [fetchUsers.rejected]: (state) => {
            state.users = []
            state.status = "error"
        },

        //Добавляем пользователя в бд на сервере
        [fetchAddUser.pending]: (state) => {
            state.status = "loading"
        },
        [fetchAddUser.fulfilled]: (state, action) => {
            state.users = [...state.users, action.payload]
                .sort((a,b) => a.id - b.id);
            state.status = "loaded"
        },
        [fetchAddUser.rejected]: (state) => {
            state.users = []
            state.status = "error"
        },

        //Изменяем пользователя
        [fetchEditUser.pending]: (state) => {
            state.status = "loading"
        },
        [fetchEditUser.fulfilled]: (state, action) => {
            state.users = 
            [...state.users
                .filter((user) => user.id !== action.payload.id),
                    action.payload].sort((a,b) => a.id - b.id)
            state.status = "loaded"
        },
        [fetchEditUser.rejected]: (state) => {
            state.users = []
            state.status = "error"
        },

        //Удаляем пользователя
        [fetchRemoveUser.pending]: (state) => {
            state.status = "loading"
        },
        [fetchRemoveUser.fulfilled]: (state, action) => {
            state.users = [...state.users
                .filter((user) => user.id !== action.meta.arg)]
                    .sort((a,b) => a.id - b.id)
            console.log(action)
            state.status = "loaded"
        },
        [fetchRemoveUser.rejected]: (state) => {
            state.users = []
            state.status = "error"
        }
    }
});


export const selectUsers = (state) => state.users.users
export const usersReducer = usersSlice.reducer