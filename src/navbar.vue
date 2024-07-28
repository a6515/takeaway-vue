<script setup>
import { useRouter } from 'vue-router'
import useuserStore from './stores/user_info'
import { userInfo, down } from '@/api/User'
import { useTokenStore } from '@/stores/token.js'
import { ElMessage, ElMessageBox } from 'element-plus'
import { ref } from 'vue'
const tokenStore = useTokenStore()
const stores = useuserStore()
const router = useRouter()
const datas = ref({})
const is = ref(false)
if (typeof tokenStore.token === 'undefined' || tokenStore.token === '') {
    is.value = false
}
else {
    is.value = true
}
function clicks1() {
    router.push('/HomePage');
}

function clicks2() {
    router.push('/Menu');
}

function clicks3() {
    router.push('/Cart');
}

function clicks4() {
    if (typeof tokenStore.token === 'undefined' || tokenStore.token === '') {
        router.push('/ulogin')
    }
    else {
        router.push('/uuser')
    }

}

function clicks5() {
    router.push('/About');
}
async function downs() {
    await down(stores.info.user_id)
}
function handleclick(command) {
    if (command === 'logout') {
        ElMessageBox.confirm(
            '确认退出登录?',
            '警告',
            {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'warning',
            }
        )
            .then(() => {
                downs()
                stores.removeInfo()
                tokenStore.removeToken()
                router.push('/')
                ElMessage({
                    type: 'success',
                    message: '登出',
                })
            })
            .catch(() => {
                ElMessage({
                    type: 'info',
                    message: '取消',
                })
            })
    }
    else {
        router.push(command)
    }

}
if (typeof tokenStore.token === 'undefined' || tokenStore.token === '') {
    //注意此处因为未登录，不进行任何操作
}
else {
    async function getinfos() {
        datas.value = await userInfo().catch(err => { console.log(err) })
        console.log(datas.value)
        if (typeof stores.info.user_id != 'undefined' && datas.value.data.password != stores.info.password) {
            downs()
            stores.removeInfo()
            tokenStore.removeToken()
            window.location.reload()
            ElMessage({
                type: 'error',
                message: '用户信息更新，请重新登陆',
                duration: 3000
            })


        }
        else {
            stores.setInfo(datas.value.data).catch(err => { console.log(err) })
        }


    }

    getinfos().catch(err => { console.log(err) })
}


</script>

<template>
    <div class="container">
        <!-- 导航条 -->
        <nav class="navbar">
            <ul class="nav-list">
                <li class="navv-item">李四621号餐厅</li>
                <div class="nav-items-right">
                    <li class="nav-item" @click="clicks1">主页</li>
                    <li class="nav-item" @click="clicks2">菜单</li>
                    <li class="nav-item" @click="clicks3">购物车</li>
                    <li class="nav-item" @click="clicks5">关于</li>
                    <li class="nav-item" @click="clicks4">

                        <el-dropdown class="head-box" @command="handleclick">
                            <span>
                                <el-avatar :src="stores.info.avatar" />
                            </span>
                            <template #dropdown>
                                <el-dropdown-menu>
                                    <el-dropdown-item command="/HomePage">首页</el-dropdown-item>
                                    <el-dropdown-item command="/uuser">基本资料</el-dropdown-item>
                                    <el-dropdown-item v-if="is" divided command="logout">退出登录</el-dropdown-item>
                                </el-dropdown-menu>
                            </template>
                        </el-dropdown>
                    </li>
                </div>
            </ul>
        </nav>
    </div>
</template>

<style scoped>
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #21211e;
    padding: 10px 20px;
}

.nav-list {
    display: flex;
    align-items: center;
    list-style: none;
    margin: 0;
    padding: 0;
    width: 100%;
}

.navv-item {
    color: white;
    margin-right: auto;
    padding-top: 0;
    margin-top: 0;
    ;
}

.nav-items-right {
    display: flex;
    align-items: center;
}

.nav-item {
    color: white;
    margin: 0 30px;
    cursor: pointer;
}

.nav-item:hover {
    text-decoration: underline;
}

.head-box {
    position: relative;
    padding-top: 0;
    margin-top: 0;
}
</style>