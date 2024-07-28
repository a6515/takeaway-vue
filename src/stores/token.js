import { defineStore } from "pinia"
import { ref } from 'vue'
export const useTokenStore = defineStore('token', () => {
    const token = ref('')//个人令牌--验证身份信息（本质上是一串字符串）

    const setToken = (newToken) => {
        token.value = newToken
    }
    const removeToken = () => {
        token.value = ''

    }
    return {
        token, setToken, removeToken
    }
},
    {
        persist: true //持久化存储
    }

);
