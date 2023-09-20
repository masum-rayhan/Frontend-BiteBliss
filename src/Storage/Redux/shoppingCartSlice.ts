import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
};

export const shoppingCartSlice = createSlice({
    name: "cartItems",
    initialState: initialState,
    reducers: {
        setShoppingCart: (state, action) => {
            state.cartItems = action.payload;
        },

        // updateQuantity: (state, action) => {
        //     //payload - cartItem that needs to be updated, newQuantity
        //     state.cartItems = state.cartItems?.map((item) => {
        //       if (item. === action.payload.cartItem.id) {
        //         item.quantity = action.payload.quantity;
        //       }
        //       return item;
        //     });
        //   },
    },
});

export const { setShoppingCart } = shoppingCartSlice.actions;
export const shoppingCartReducer = shoppingCartSlice.reducer;