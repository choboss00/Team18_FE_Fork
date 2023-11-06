import axios from "axios";

// instance
export const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  // baseURL: "" + "/api",
  headers: { "Content-Type": "application/json" },
  timeout: 1000 * 5,
});

// middleware
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `${token.replace(/"/g, "")}`;
    } else {
      console.error("Authorization token is missing or invalid.");
    }
    return config;
  },
  (error) => {
    console.log(`[API REQEST ERROR] ${error}`);
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
    if (error.response && error.response.status && error.message) {
      const states = { 3: "Redirect", 4: "Client", 5: "Server" };
      const state = states[Math.floor(error.response.status / 100)];
      console.log(
        `[API RESPONSE ERROR] ${error.response.status}(${state}): ${error.message}`
      );
    } else console.log(`[API RESPONSE ERROR] ${error}`);
    console.dir(error);
    return Promise.reject(error);
  }
);
