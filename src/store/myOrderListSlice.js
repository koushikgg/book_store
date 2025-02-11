import { createSlice } from "@reduxjs/toolkit";

const myOrderListSlice = createSlice({
    name : "wishList",
    initialState : {
        myOrderListItems : [],
    },
    reducers : {
        getMyOrderList: (state,action) => {
            state.myOrderListItems=action.payload
        },
        addItemToMyOrderList: (state, action) => {
            const itemExists = state.myOrderListItems.some(item => item._id === action.payload._id);
            if (!itemExists) {
                state.myOrderListItems.push(action.payload);
            }
        },
        deleteItemFromMyOrderList: (state, action) => {
            state.myOrderListItems = state.myOrderListItems.filter((list) => list._id !== action.payload._id)
        }
    }
})
export const {getMyOrderList, addItemToMyOrderList, deleteItemFromMyOrderList} = myOrderListSlice.actions;
export default myOrderListSlice.reducer