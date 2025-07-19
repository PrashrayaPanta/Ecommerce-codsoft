import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";



export { setUser, clearUser } from "./userSlice";

// export { setCart, clearCart } from "./cartSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    // cart: cartReducer,
  },
});
