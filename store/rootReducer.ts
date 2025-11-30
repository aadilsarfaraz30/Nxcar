import { combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"; 
import { persistReducer } from "redux-persist";
import citySlice from "@/store/features/cities-slice";
import carsSlice from "@/store/features/cars-slice";



const persistConfig = {
  key: "root",
  storage,
  whitelist: [""], // which reducers to persist
};

const rootReducer = combineReducers({
  citySlice,
  carsSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);



export default persistedReducer;
