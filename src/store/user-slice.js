import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//     todos:[],
// }

const userSlice = createSlice({
  name: "user-slice",
  initialState: {
    currency: "₹"
  },
  reducers: {
    changeCurrency(state, action) {
      state.currency = action.payload.currency
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice;