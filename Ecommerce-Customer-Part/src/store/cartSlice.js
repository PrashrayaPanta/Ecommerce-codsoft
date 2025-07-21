import { createSlice } from "@reduxjs/toolkit";
import { ToStorage, FromStorage } from "../library";

// const cart = FromStorage("r130cart");

// console.log(cart);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    // value: cart ? JSON.parse(cart) : null
    value: null,
  },

  reducers: {
    setCart: (state, action) => {
      state.value = action.payload;


      console.log(action.payload);
      
      // console.log(typeof action.payload);
      


      ToStorage("cartItems", JSON.stringify(action.payload), true);



      // console.log(typeof action.payload["687dc9dc5e00b4d5689d8bb3"]);
    },

    clearCart: (state) => {
      state.value = null;
    },
  },
});

export const { setCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
