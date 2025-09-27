import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "./features/adminSlice";
import userReducer from "./features/userSlice";
import sideBarReducer from "./features/sideBarSlice";
import classReducer from "./features/classSlice";



const store = configureStore({
    reducer: {
        admin: adminReducer,
        user: userReducer,    
        SiderBar:sideBarReducer,
        class:classReducer
    }
})

export default store