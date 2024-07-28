<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { reactive } from 'vue'
import { uload, register, callback } from './api/User'
import { useTokenStore } from '@/stores/token.js'
const tokenStore = useTokenStore()
const router = useRouter()
const datas = ref({})
const isLoginForm = ref(true)
const is = ref(true)
const form = reactive({
  id:"",
  name: "",
  password: ''
})
const rform = reactive({
  name: "",
  password: '',
  repassword: ''
})

const cform = reactive({
  id: "",
  name: "",
  password: ''
})

async function login() {
  try {

    if (form.name === '' || form.password === '' || form.name.length > 20 || form.password.length < 4 || form.password.length > 20) {
      return
    }

    datas.value = await uload(form.id,form.name, form.password);
    console.log(datas.value);

    ElMessage.success({ message: '登陆成功', duration: 1000 });
    tokenStore.setToken(datas.value.data);
    datas.value = {}
    form.id=''
    form.name = ''
    form.password = ''
    setTimeout(() => {
      router.push('/');
    }, 1000);
  } catch (error) {
    // 在这里处理异常
    console.error('登录异常:', error);
  }
}

async function registers() {
  try {

    if (rform.name === '' || rform.password === '' || rform.name.length > 20 || rform.password.length < 1 || rform.password.length > 20
      || rform.repassword.length < 4 || rform.repassword.length > 20 || rform.password != rform.repassword
    ) {
      return
    }
    datas.value = await register(rform.name, rform.password)
    console.log(datas.value);
    alert("这是你的ID，务必谨记："+datas.value.data)
    ElMessage.success({ message: '注册成功', duration: 1000 })
    datas.value = {}
    rform.name = ''
    rform.password = ''
    rform.repassword = ''
    setTimeout(() => {
      router.push('/');
    }, 1000);
  } catch (error) {
    // 在这里处理异常
    console.error('注册异常:', error);
  }


};

const toggleForm = () => {
  isLoginForm.value = !isLoginForm.value;
};
function check(rule, value, callback) {
  if (value === '') { callback(new Error('请确认密码')) }
  else if (value != rform.password) { callback(new Error('请确认两次密码一样')) }
  else {
    callback()
  }
}
const rules = {
  id: [
    { required: true, message: "请输入用ID", trigger: "blur" },
    { max: 10, message: "ID长度最多为10位", trigger: "blur" }
  ],
  name: [
    { required: true, message: "请输入用户名", trigger: "blur" },
    { max: 20, message: "用户名长度最多为20位", trigger: "blur" }
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 4, max: 20, message: "长度为4--20位字符", trigger: "blur" }
  ],
  repassword: [
    { validator: check, trigger: "blur" }
  ]

}

function gohome() {
  router.push('/')
}

async function callbacks() {
  datas.value = await callback(cform.id, cform.name, cform.password).catch(err => { console.log(err) });
  cform.id = ''
  cform.name = ''
  cform.password = ''

  router.push('/')
  ElMessage.success({ message: '找回成功', duration: 1000 })
  console.log(datas.value)
}
function change() {
  is.value = !is.value
}
</script>


<template>
  <div class="login-container">
    <!-- Left Section - Display Image -->
    <div class="left-section">
      <img src="./images/xiaoguo.png" alt="Display Image" class="display-image">
    </div>

    <!-- Right Section - Login Form -->
    <div class="right-section" v-if="is">
      <div class="form-container" style="padding:180px 30px">
        <h1 v-if="isLoginForm">登录</h1>
        <h1 v-else>注册</h1>
        <el-form :rules="rules" :model="form" v-if="isLoginForm" @submit.prevent="login">
          <el-form-item label="用户ID:" prop="id">
            <el-input v-model="form.id" style="width: 255px" placeholder="请输入用户名" />
          </el-form-item>

          <el-form-item label="用户名:" prop="name">
            <el-input v-model="form.name" style="width: 255px" placeholder="请输入用户名" />
          </el-form-item>

          <el-form-item label="密码:" prop="password">
            <el-input v-model="form.password" style="width: 255px" type="password" placeholder="请输入密码" show-password />
          </el-form-item>
          <el-button type="primary" native-type="submit">登录</el-button>
        </el-form>

        <el-form :rules="rules" :model="rform" v-else @submit.prevent="registers">
          <el-form-item label="用户名:" prop="name">
            <el-input v-model="rform.name" style="width: 255px" placeholder="请输入用户名" />
          </el-form-item>
          <el-form-item label="密码:" prop="password">
            <el-input v-model="rform.password" style="width: 255px" type="password" placeholder="请输入密码" show-password />
          </el-form-item>
          <el-form-item label="确认密码:" prop="repassword">
            <el-input v-model="rform.repassword" style="width: 255px" type="password" placeholder="请输入密码"
              show-password />
          </el-form-item>
          <el-button type="primary" native-type="submit">注册</el-button>
        </el-form>
        <el-button @click="toggleForm">{{ isLoginForm ? '注册' : '返回登录' }}</el-button>
        <el-button type="info" @click="gohome">首页</el-button>
        <el-button type="danger" round @click="change">忘记密码点我 </el-button>
      </div>
    </div>

    <div class="call" v-else>
      <h1>找回密码</h1>
      <el-form :rules="rules" :model="cform" @submit.prevent="callbacks">
        <el-form-item label="用户ID:" prop="id">
          <el-input v-model="cform.id" style="width: 255px" placeholder="请输入用户ID" />
        </el-form-item>
        <el-form-item label="用户名:" prop="name">
          <el-input v-model="cform.name" style="width: 255px" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="密码:" prop="password">
          <el-input v-model="cform.password" style="width: 255px" type="password" placeholder="请输入新密码" show-password />
        </el-form-item>
        <el-button type="primary" native-type="submit">找回</el-button>
      </el-form>
      <el-button type="success" plain @click=change>点我回去登录</el-button>
    </div>
  </div>
</template>



<style scoped>
.login-container {
  display: flex;
  height: 100vh;
}

.left-section {
  width: 70%;
}

.right-section {
  width: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.display-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.form-container {
  width: 80%;
  padding: 20px;
  background: #f0f2f5;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, .1);
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
}

.el-input {
  width: 100%;
  margin-bottom: 20px;
}

.el-button {
  width: 100%;
  margin-top: 20px;
}
</style>