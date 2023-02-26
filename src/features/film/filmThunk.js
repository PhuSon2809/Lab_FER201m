import axiosClient from "../../api/axiosClient";
import { getAllFilms } from "./filmSlice";

export const getAllFilmsThunk = async (_, thunkAPI) => {
  try {
    const response = await axiosClient.getByUrl("/films");
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getFilmThunk = async (filmId, thunkAPI) => {
  try {
    const response = await axiosClient.getByUrl(`/films/${filmId}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const createFilmThunk = async (params, thunkAPI) => {
  await axiosClient
    .post("/films", params)
    .then((response) => {
      if (response) {
        thunkAPI.dispatch(getAllFilms());
        console.log("Create user successfully.");
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const updateFilmThunk = async ({ filmId, data }, thunkAPI) => {
  await axiosClient
    .put(`/films/${filmId}`, data)
    .then((response) => {
      if (response) {
        thunkAPI.dispatch(getAllFilms());
        console.log("Update film successfully.");
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteFilmThunk = async (filmId, thunkAPI) => {
  try {
    const response = await axiosClient.delete(`/films/${filmId}`);
    if (response) {
      thunkAPI.dispatch(getAllFilms());
    }
    return response;
  } catch (error) {
    console.log(error);
  }
};
