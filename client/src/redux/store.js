import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "./features/adminSlice";
import userReducer from "./features/userSlice";
import sideBarReducer from "./features/sideBarSlice";



const store = configureStore({
    reducer: {
        admin: adminReducer,
        user: userReducer,    
        SiderBar:sideBarReducer,
    }
})

export default store