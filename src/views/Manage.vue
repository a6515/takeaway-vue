<script setup>
import { Menu as IconMenu } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox, ElIcon } from 'element-plus'
import { useRouter } from 'vue-router'
import useadminStore from '@/stores/admin_info.js'
import { getinfo } from '@/api/User'
import { ref } from 'vue'
import { useTokenStore } from '@/stores/token.js'
import { delToken } from '@/api/User'
const tokenStore = useTokenStore()
const stores = useadminStore()
const router = useRouter()
const datas = ref({})
const handleOpen = (key, keyPath) => {
    console.log(key, keyPath)
}
const handleClose = (key, keyPath) => {
    console.log(key, keyPath)
}
async function getinfos() {
    datas.value = await getinfo().catch(err => { console.log(err) })
    console.log(datas.value)
    stores.setInfo(datas.value.data).catch(err => { console.log(err) })

}
getinfos().catch(err => { console.log(err) });

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
            .then(async () => {
                await delToken()
                stores.removeInfo()
                tokenStore.removeToken()
                router.push('/Login')
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
        router.push('/Manage/' + command)
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
                    <el-menu-item index="FoodClass">

                        <el-icon style="color:rgba(0, 0, 0, 0.5)"><icon-menu /></el-icon>
                        <span>菜系分类</span>

                    </el-menu-item>
                    <el-menu-item index="FoodManage">
                        <el-icon>
                            <Edit />
                        </el-icon>
                        <span>订单管理</span>
                    </el-menu-item>
                    <el-sub-menu index="3">
                        <template #title>
                            <el-icon>
                                <User />
                            </el-icon>
                            <span>个人中心</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="User"><el-icon>
                                    <Suitcase />
                                </el-icon>基本资料</el-menu-item>
                            <el-menu-item index="UserPassword"><el-icon>
                                    <Lock />
                                </el-icon>重置密码</el-menu-item>
                        </el-menu-item-group>
                    </el-sub-menu>
                </el-menu>
            </el-aside>
            <el-container style="width: 100%;">
                <el-header style="font-size: 12px; background-color:rgba(0, 0, 0, 0.03)" class="head">
                    <el-row :xs="4" :sm="6" :md="9" :xl="30" style="width: 100%;">
                        <el-col span="1" style="background-color: aquamarine;">
                            <div style="font-size:large">欢迎登录,尊贵的<strong>{{ stores.info.name }}</strong></div>
                        </el-col>
                        <!--下拉菜单-->
                        <el-col :xs="4" :sm="6" :md="8" :lg="20" :xl="30" style="background-color:hotpink">
                            <el-dropdown class="head-box" @command="handleclick">
                                <span>
                                    <el-avatar :src="stores.info.avatar" />
                                </span>
                                <template #dropdown>
                                    <el-dropdown-menu>
                                        <el-dropdown-item command="User">基本资料</el-dropdown-item>
                                        <el-dropdown-item command="UserPassword">重置密码</el-dropdown-item>
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
