
import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cartDetails: [],
    },
    reducers: {
        addBooktoCart: (state, action) => {
            state.cartDetails.push(action.payload)
        },
        increaseQuantity: (state, action) => {
            state.cartDetails = state.cartDetails.map(book => {
                if (book._id === action.payload._id) {
                    return {
                        ...book,
                        quantity: book.quantity + 1
                    };
                }
                return book;
            });
        },
        decreaseQuantity: (state, action) => {
            state.cartDetails = state.cartDetails.map(book => {
                if (book._id === action.payload._id) {
                    return {
                        ...book,
                        quantity: book.quantity - 1
                    }
                }
                return book
            })
        },
        removeQuantity: (state, action) => {
            state.cartDetails = state.cartDetails.filter(book => {
                if (book._id !== action.payload._id) {
                    return book;
                }
            });
        }
    }
});

export const { addBooktoCart, increaseQuantity, decreaseQuantity, removeQuantity } = cartSlice.actions;
export default cartSlice.reducer;
