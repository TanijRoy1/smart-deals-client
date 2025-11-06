import axios from "axios";
import useAuth from "./useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const instance = axios.create({
  baseURL: "https://smart-deals-api-server-gamma.vercel.app",
});

const useAxiosSecure = () => {
  const { user, loading, signOutUser } = useAuth();
  const navigate = useNavigate()

  useEffect(() => {
    if (loading) return;
    const requestInterceptor = instance.interceptors.request.use((config) => {
      config.headers.authorization = `Bearer ${user?.accessToken}`;
      // console.log(config)
      return config;
    });

    // response interceptors
    const responseInterceptor = instance.interceptors.response.use(res => {
        return res;
    }, err => {
        console.log(err);
        const status = err.status;
        if(status === 401 || status === 403){
            console.log("log out the user for bad request.");
            signOutUser()
             .then(()=> {
                navigate("/auth/login");
             })
        }
    })

    return () => {
        instance.interceptors.request.eject(requestInterceptor);
        instance.interceptors.response.eject(responseInterceptor);
    }
  }, [user, loading, signOutUser, navigate]);

  return instance;
};

export default useAxiosSecure;
