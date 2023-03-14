import { configureStore } from '@reduxjs/toolkit'
import basketReducer from "./features/basketSlice";
import restaurantReducer from "./features/restauranrSlice";

export const store = configureStore({
  reducer: {
    basket: basketReducer,
    restaurant: restaurantReducer
  },
})