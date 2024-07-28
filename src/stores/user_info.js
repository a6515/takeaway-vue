import { defineStore } from "pinia"
import { ref } from 'vue'
const useuserStore= defineStore('user_info', () => {
    //定义状态相关内容，定义用户个人信息
    const info = ref({})
    const setInfo = (newInfo) => {
        info.value = newInfo;
    }
    const removeInfo = () => {
        info.value = {}
    }
    return { info, setInfo, removeInfo }


}, { persist: true })

export default useuserStore;