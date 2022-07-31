import axios, { AxiosRequestConfig } from "axios";

export const fetching = (options: AxiosRequestConfig) => {
  const accessToken = window.localStorage.getItem("accessToken");
  return axios({
    ...options,
    headers: options.headers
      ? {
          ...options.headers,
          Authorization: "Bearer " + accessToken,
        }
      : {
          Authorization: "Bearer " + accessToken,
        },
  });
};
