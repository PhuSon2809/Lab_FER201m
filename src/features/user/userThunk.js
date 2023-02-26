import axiosClient from "../../api/axiosClient";
import { getAllUsers } from "./userSlice";

export const getAllUsersThunk = async (_, thunkAPI) => {
  try {
    const response = await axiosClient.getByUrl("/users");
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const createUserThunk = async (params, thunkAPI) => {
  await axiosClient
    .post("/users", params)
    .then((response) => {
      if (response) {
        thunkAPI.dispatch(getAllUsers());
        console.log("Create user successfully.");
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const updateUserThunk = async ({ userId, data }, thunkAPI) => {
  await axiosClient
    .put(`/users/${userId}`, data)
    .then((response) => {
      if (response) {
        thunkAPI.dispatch(getAllUsers());
        console.log("Update user successfully.");
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteUserThunk = async (userId, thunkAPI) => {
  try {
    const response = await axiosClient.delete(`/users/${userId}`);
    if (response) {
      thunkAPI.dispatch(getAllUsers());
    }
    return response;
  } catch (error) {
    console.log(error);
  }
};
