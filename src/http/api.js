import axios from "axios";

const Mode = "LocalHost";
const baseURL = (Mode == "LocalHost" ? "http://localhost:8000/api" : "https://ultimate-topic-list.herokuapp.com/api");

const instance = axios.create({
  baseURL,
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
  
    if (originalConfig.url !== "/jwt/create" && err.response) {
      // Access Token was expired
      console.log(originalConfig.url);
      let refreshToken = localStorage.getItem("refreshToken")
      if(refreshToken == null){
        refreshToken = "abc";
      }
      console.log(err.response.status);
      console.log(originalConfig._retry);
      if (err.response.status === 401 && !originalConfig._retry) {
        console.log("Inside");
        originalConfig._retry = true;
        
        try {
          const rs = await axios.post("/accounts/jwt/refresh/",
          {
              refresh : refreshToken
          });
  
          const { access } = rs.data;
          console.log(rs.data);

          localStorage.setItem("accessToken",access)
  
          return instance(originalConfig);
        } catch (_error) {
          console.log("Hello");
          localStorage.clear();
            // if(window.location.pathname!="/login"){
            //   window.location.pathname="/login";
            // }
          return Promise.reject(_error);
        }
      }
  }
  
  return Promise.reject(err);
  }
  );
  
  export default instance;