import axios from 'axios';
import { ElMessage } from 'element-plus';
import { useTokenStore } from '@/stores/token.js';
import router from '@/router';
import useuserStore from '@/stores/user_info.js';
const baseURL = "http://localhost:8080";
const instance = axios.create({ baseURL });
let lastMessageTime = 0; // 记录上次显示提示信息的时间戳
let isMessageShown = false; // 标志位，记录是否已经显示过信息

// 防抖函数，用于限制消息提示的显示频率
function debounceMessage(message) {
    const currentTime = Date.now();
    const timeout = 3000; // 设置防抖间隔为3秒

    if (!isMessageShown || currentTime - lastMessageTime > timeout) {
        isMessageShown = true;
        lastMessageTime = currentTime;
        ElMessage.error({message:message,duration:1500});
        setTimeout(() => {
            isMessageShown = false; // 3秒后重置标志位，允许再次显示
        }, timeout);
    }
}

// 请求拦截器
instance.interceptors.request.use(
    (config) => {
        const tokenStore = useTokenStore();
        if (tokenStore.token) {
            config.headers.Authorization = tokenStore.token;
        }
        return config;
    },
    (err) => {
        return Promise.reject(err);
    }
);

// 响应拦截器
instance.interceptors.response.use(
    result => {
        if (result.data.code === 0) {
            return result.data;
        } else if (result.data.code === 1){
            ElMessage.error(result.data.message ? result.data.message : '服务异常777');
                return Promise.reject(result.data);
           
        }
        
    },
    err => {
        if (err.response.status === 401) {
            debounceMessage("请先登录");
            router.push('/ulogin');
        } else if (err.response.status === 999) {
            debounceMessage("该菜系下还有菜品");
        } else if (err.response.status === 998) {
            const userstore= useuserStore()
            const tokenStore = useTokenStore()
            userstore.removeInfo()
            tokenStore.removeToken()
            debounceMessage("token过期了,请登录");
            router.push('/ulogin');
        } 
        else if (err.response.status === 900) {
            debounceMessage("还有订单未完成");
        }
        
        else {
            debounceMessage(err.response.data.message ? err.response.data.message : '服务异常666');
        }
        return Promise.reject(err);
    }
);

export default instance;