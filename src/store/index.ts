// import incomSlice from "./incom-slice";
import { configureStore } from "@reduxjs/toolkit";
// import comSlice from "./com-slice";
import userSlice from "./user-slice";


const store = configureStore({
    reducer: { currency: userSlice.reducer}
})

export type IRootState = ReturnType<typeof store.getState>
export default store;