import axios from "axios"
// import { Store } from "vuex";

const aaxios = axios.create({
    baseURL: "localhost:3007",
    timeout: 5000
})

//在发请求之前：请求拦截器可以检测到，加入token

aaxios.interceptors.request.use((config) => {
    let access_token = localStorage.getItem('token');
    if (access_token) {
        config.headers.token = localStorage.getItem('token')
    }

    return config;
});
//对外暴露
export default aaxios;