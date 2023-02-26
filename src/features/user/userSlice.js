import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  createUserThunk,
  deleteUserThunk,
  getAllUsersThunk,
  updateUserThunk,
} from "./userThunk";

const initialState = {
  isLoading: false,
  isEditing: false,
  users: [],
  user: {},
};

export const getAllUsers = createAsyncThunk(
  "user/getAllUsers",
  getAllUsersThunk
);

export const createUser = createAsyncThunk("user/createUser", createUserThunk);

export const updateUser = createAsyncThunk("user/updateUser", updateUserThunk);

export const deleteUser = createAsyncThunk("user/deleteUser", deleteUserThunk);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAddUser: (state) => {
      state.isEditing = false;
    },
    setEditUser: (state, action) => {
      state.isEditing = true;
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = [...action.payload];
      })
      .addCase(getAllUsers.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(createUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createUser.fulfilled, (state) => {
        state.isLoading = false;
        toast.success("Add user successfully!");
      })
      .addCase(createUser.rejected, (state) => {
        state.isLoading = false;
        toast.error("Add user fail!");
      })
      .addCase(updateUser.fulfilled, (state) => {
        state.isLoading = false;
        toast.success("Update user successfully!");
      })
      .addCase(updateUser.rejected, (state) => {
        state.isLoading = false;
        toast.error("Update user fail!");
      })
      .addCase(deleteUser.fulfilled, (state) => {
        toast.success("Delete user successfully!");
      })
      .addCase(deleteUser.rejected, (state) => {
        toast.error("Delete user fail!");
      });
  },
});

export const { setAddUser, setEditUser } = userSlice.actions;
export default userSlice.reducer;
