import { createAxiosClient } from "./createAxiosClient";
import EnvVars from "../../dev_env";
import store from "../redux/store";

//const REFRESH_TOKEN_URL = 'http://localhost:5000/api/v1/auth/refreshToken'
const serverUrl = EnvVars.serverUrl;

/*
function getCurrentRefreshToken() {
    // this is how you access the zustand store outside of React.
    //return useAuthStore.getState().refreshToken
}

function setRefreshedTokens(tokens){
    console.log('set tokens...')
}
*/
async function logout(){
    console.log('logout...')
}

export const axiosClient = (token) => {
    //console.log("🚀 ~ axiosClient will be created now - received:", typeof (token));
    return createAxiosClient({
    options: {
        baseURL: serverUrl,
        timeout: 300000,
        headers: {
            'Content-Type': 'application/json',
        }
    },
    token,
    //getCurrentRefreshToken,
    //refreshTokenUrl: REFRESH_TOKEN_URL,
    logout,
    //setRefreshedTokens
    });
}