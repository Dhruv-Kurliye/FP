import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  userStats: null,
  loading: false,
  error: null,
};

const checkUserStatsSlice = createSlice({
  name: "checkUserStats",
  initialState,
  reducers: {
    checkUserStatsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    checkUserStatsSuccess: (state, action) => {
      state.loading = false;
      state.userStats = action.payload;
    },
    checkUserStatsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { actions } = checkUserStatsSlice;

export const checkUserStats = () => async (dispatch) => {
  const token = localStorage.getItem("token"); // Get the token from localStorage
  const config = {
    headers: {
      Authorization: token,
    },
  };
  dispatch(actions.checkUserStatsStart());

  try {
    const response = await axios.get(`/api/common/checkuserstats`, config);
    dispatch(actions.checkUserStatsSuccess(response.data.userStats));
    return response;
  } catch (error) {
    dispatch(actions.checkUserStatsFailure(error.message));
  }
};

export default checkUserStatsSlice.reducer;
