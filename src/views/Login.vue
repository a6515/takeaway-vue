<script setup lang="jsx">
import { reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'
import { load } from '@/api/User'
import { useRouter } from 'vue-router'
import { ElButton} from 'element-plus'
import { useTokenStore } from '@/stores/token.js'
const tokenStore = useTokenStore()
const isLoginForm = ref(true);
const router = useRouter()
const datas = ref({})
const form = reactive({
    name: "",
    password: ''
})
const rform = reactive({
    name: "",
    password: '',
    qpassword: ''
})
async function login() {
    try {
        datas.value = await load(form.name, form.password);
        console.log(datas.value);

        ElMessage.success({ message: '登陆成功', duration: 1000 });
        tokenStore.setToken(datas.value.data);
        setTimeout(() => {
            router.push('/Manage');
        }, 1000);
    } catch (error) {
        // 在这里处理异常
        console.error('登录异常:', error);
    }
}



const rules = {
    name: [
        { required: true, message: "请输入用户名", trigger: "blur" },
        { max: 20, message: "用户名长度最多为20位", trigger: "blur" }
    ],
    password: [
        { required: true, message: "请输入密码", trigger: "blur" },
        { min: 4, max: 20, message: "长度为5--20位字符", trigger: "blur" }
    ]
}

</script>

<template>

    <el-row>
        <el-col :span="16" class="bg"></el-col>
        <el-col :span="8" class="fm">
            <!--登陆表单-->
            <el-form :rules="rules" :model="form" label-width="auto" style="max-width: 600px" v-if="isLoginForm">
                <h1>登录</h1>
                <el-form-item label="用户名:" prop="name">
                    <el-input v-model="form.name" style="width: 255px" placeholder="请输入用户名" />
                </el-form-item>
                <el-form-item label="密码:" prop="password">
                    <el-input v-model="form.password" style="width: 255px" type="password" placeholder="请输入密码"
                        show-password />
                </el-form-item>
                <el-form-item>
                    <el-button type="success" style="width: 72%" v-on:click="login">登录</el-button>
                </el-form-item>

            </el-form>




        </el-col>
    </el-row>
</template>

<style scoped>
.bg {
    background-image: url("/src/images/xiaoguo.png");
    background-size: 100% 100%;
    /* 图片拉伸到完全填充容器 */
    background-position: center;
    /* 确保图片居中 */
    background-repeat: no-repeat;
    /* 防止图片重复 */
    height: 100vh;
    /* 根据需要调整高度 */
    border-radius: 5px;
}

.fm {
    padding-top: 25vh;
    padding-left: 40px;
    background: #f0f2f5;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, .1);
}

.el-alert {
    margin: 20px 0 0;
}
</style>
