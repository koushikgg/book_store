
import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cartDetails: [],
    },
    reducers: {
        addBooktoCart: (state, action) => {
            state.cartDetails.push({...action.payload, quantityToBuy: 1})
        },
        increaseQuantity: (state, action) => {
            state.cartDetails = state.cartDetails.map(book => {
                if (book._id === action.payload._id) {
                    return {
                        ...book,
                        quantityToBuy: book.quantityToBuy + 1
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
                        quantityToBuy: book.quantityToBuy - 1
                    }
                }
                return book
            })
        },
        updateQuantity: (state, action)=>{
            state.cartDetails = state.cartDetails.map(book => {
                if (book._id === action.payload._id) {
                    return {
                        ...action.payload
                    }
                }
                return book
            })
        },
        removeQuantity: (state, action) => {
            console.log("remove");
            state.cartDetails = state.cartDetails.filter(book => {
                if (book._id !== action.payload._id) {
                    return book;
                }
            });
        }
    }
});

export const { addBooktoCart, increaseQuantity, decreaseQuantity, removeQuantity, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
