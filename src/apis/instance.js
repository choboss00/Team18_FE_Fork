import axios from "axios";

// instance
export const instance = axios.create({
  baseURL: "" + "/api",
  headers: { "Content-Type": "application/json" },
  timeout: 1000 * 5,
});

// middleware
instance.interceptors.request.use(
  (config) => {
    const auth = localStorage.getItem("token");
    if (auth) config.headers["Authorization"] = auth;
    return config;
  },
  (error) => {
    console.err(`[API REQEST ERROR] ${error}`);
    console.dir(error);
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    console.dir(response);
    return response;
  },
  (error) => {
    console.err(`[API RESPONSE ERROR] ${error}`);
    console.dir(error);
    return Promise.reject(error);
  }
);
