import axios from "axios";

const instance = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true
});



instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        config.headers["Authorization"] = "Bearer "+ token; 
      }
      return config;
  },
  (error) => {
    return Promise.reject(error);
  }
  );
  
  instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;
  
    if (originalConfig.url !== "/accounts/jwt/create/" && err.response) {
      // Access Token was expired
      let refreshToken = localStorage.getItem("refreshToken")
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;
  
        try {
          const rs = await instance.get("accounts/jwt/refresh/",{
              withCredentials:true,
          }, {
              refresh : refreshToken
          });
  
          const { access } = rs.data;
          localStorage.setItem("accessToken",access)
  
          return instance(originalConfig);
        } catch (_error) {
            window.location.pathname="/login"
          return Promise.reject(_error);
        }
      }
  }
  
  return Promise.reject(err);
  }
  );
  
  export default instance;