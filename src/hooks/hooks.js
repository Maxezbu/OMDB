import axios from "axios";

export const getManyByTitleAndType = (title, type) => {
  return axios
    .get(`https://www.omdbapi.com/?apikey=20dac387&s=${title}&type=${type}"`)

    .then((response) => response.data)
    .then((data) => data.Search);
};

export const getOneByTitle = (title) => {
  return axios
    .get(`https://www.omdbapi.com/?apikey=20dac387&t=${title}"`)

    .then((response) => response.data)
    .then((data) => data);
};

export const getBase = () => {
  return axios
    .get("https://www.omdbapi.com/?apikey=20dac387&s=tragedia&y=2021")

    .then((response) => response.data)
    .then((data) => data.Search);
};
