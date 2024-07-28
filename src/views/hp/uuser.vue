<script setup>
import { ElMessage, ElMessageBox, ElIcon } from 'element-plus'
import { useRouter } from 'vue-router'
import { userInfo, down } from '@/api/User'
import { ref } from 'vue'
import { useTokenStore } from '@/stores/token.js'
import useuserStore from '../../stores/user_info'
const router = useRouter()
const stores = useuserStore()
const tokenStore = useTokenStore()
const datas = ref({})
const handleOpen = (key, keyPath) => {
    console.log(key, keyPath)
}
const handleClose = (key, keyPath) => {
    console.log(key, keyPath)
}
async function getinfos() {
    datas.value = await userInfo().catch(err => { console.log(err) })
    console.log(datas.value)
    if (typeof stores.info.user_id != 'undefined' && datas.value.data.password != stores.info.password) {
        downs()
        stores.removeInfo()
        tokenStore.removeToken()
        window.location.reload()
        router.push('/')
        ElMessage({
            type: 'error',
            message: '用户信息跟新，请重新登陆',
            duration: 1500
        })


    }
    else {
        stores.setInfo(datas.value.data).catch(err => { console.log(err) })
    }


}
getinfos().catch(err => { console.log(err) });

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
</script>

<template>
    <div class="common-layout">
        <el-container>
            <el-aside width="30vh" style="background-color:transparent" class="aside">
                <div class="logo"></div>
                <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
                    router="router">
                    <el-sub-menu>
                        <template #title>
                            <el-icon>
                                <User />
                            </el-icon>
                            <span>个人中心</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="usercenter"><el-icon>
                                    <Suitcase />
                                </el-icon>基本资料</el-menu-item>
                            <el-menu-item index="introduce"><el-icon>
                                    <Memo />
                                </el-icon>我的订单</el-menu-item>
                        </el-menu-item-group>
                    </el-sub-menu>
                </el-menu>
            </el-aside>
            <el-container style="width: 100%;">
                <el-header style="font-size: 12px; background-color:rgba(0, 0, 0, 0.03)" class="head">
                    <el-row :xs="4" :sm="6" :md="9" :xl="30" style="width: 100%;">
                        <el-col span="1" style="background-color: aquamarine;">
                            <div style="font-size:large">欢迎登录,尊贵的<strong>{{ stores.info.user_name }}</strong></div>
                        </el-col>
                        <!--下拉菜单-->
                        <el-col :xs="4" :sm="6" :md="8" :lg="20" :xl="30" style="background-color:hotpink">
                            <el-dropdown class="head-box" @command="handleclick">
                                <span>
                                    <el-avatar :src="stores.info.avatar" />
                                </span>
                                <template #dropdown>
                                    <el-dropdown-menu>
                                        <el-dropdown-item command="/HomePage">首页</el-dropdown-item>
                                        <el-dropdown-item command="/uuser">基本资料</el-dropdown-item>
                                        <el-dropdown-item divided command="logout">退出登录</el-dropdown-item>
                                    </el-dropdown-menu>
                                </template>
                            </el-dropdown>
                        </el-col>
                    </el-row>

                </el-header>
                <el-main style="background-color:rgba(0, 0, 0, 0.1)" class="main">
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
<style>
.aside {
    height: 100vh;
}

.head {
    position: relative;
    width: 100%;
    height: 6vh;
    margin: 0;
    padding: 0;
}

.main {
    position: relative;
    padding: 0;
    margin: 0;

}

.logo {
    background-image: url('@/images/小郭外卖1.png');
    background-position: top;
    background-size: contain;
    /* 或者 contain，取决于你想要的效果 */
    width: 100%;
    height: 150px;
    /* 设置一个固定高度 */
}

.head-box {
    position: absolute;
    right: 0;
}
</style>
