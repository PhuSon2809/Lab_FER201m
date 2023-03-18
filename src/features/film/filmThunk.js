import axios from "axios";
import axiosClient from "../../api/axiosClient";
import { getAllFilms, getFilm } from "./filmSlice";

export const getAllFilmsThunk = async (
  { page, nation, sortBy, typeSort },
  thunkAPI
) => {
  try {
    const resultPerPage = 12;
    const url = new URL("https://63f6c63359c944921f7925eb.mockapi.io/films");
    // url.searchParams.append("completed", false);
    url.searchParams.append("page", page);
    url.searchParams.append("limit", resultPerPage);
    url.searchParams.append("nation", nation);
    url.searchParams.append("sortBy", sortBy);
    url.searchParams.append("order", typeSort);

    const response = await axios.get(url);
    const allFilms = await axiosClient.getByUrl("/films");
    return { count: allFilms.length, resultPerPage, response };
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
        thunkAPI.dispatch(getFilm(filmId));
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
