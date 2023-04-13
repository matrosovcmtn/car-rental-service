import {configureStore} from '@reduxjs/toolkit'
import { DBsReducer } from './slices/DBs';
import { usersReducer } from './slices/users';
import { carsReducer } from './slices/cars';
import { adminAuthReducer } from './slices/adminAuth';

export default configureStore({
    reducer: {
        DB: DBsReducer,
        users: usersReducer,
        cars: carsReducer,
        admin_auth: adminAuthReducer
    }
});