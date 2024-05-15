import { createSlice } from "@reduxjs/toolkit";
import { avatar } from "./avatarConstant";

const initialState = {
  name: "",
  avatar,
};

export const activateSlice = createSlice({
  name: "activate",
  initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    setAvatar: (state, action) => {
      state.avatar = action.payload;
    },
  },
});

export const { setName, setAvatar } = activateSlice.actions;

export default activateSlice.reducer;
