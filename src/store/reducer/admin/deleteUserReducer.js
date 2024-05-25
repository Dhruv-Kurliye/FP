import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  users: [],
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    deleteUserStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteUserSuccess: (state, action) => {
      state.loading = false;
      // Filter out the deleted user from the users array
      state.users = state.users.filter(user => user.id !== action.payload.deletedUser.id);
    },
    deleteUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { actions } = userSlice;

export const deleteUser = (email) => async (dispatch) => {
  dispatch(actions.deleteUserStart());

  try {
    const response = await axios.post(`/api/admin/deleteuser`, { email }); 
    dispatch(actions.deleteUserSuccess(response.data));
    console.log(response);
  } catch (error) {
    dispatch(actions.deleteUserFailure(error.message));
  }
};

export default userSlice.reducer;
