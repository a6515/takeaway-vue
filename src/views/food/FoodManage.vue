<script setup>
import {
  Delete,
  Edit
} from '@element-plus/icons-vue'
import { ref } from 'vue'
import { ElButton, ElMessageBox, ElMessage } from 'element-plus'
import { useTokenStore } from '@/stores/token.js'
import { reactive } from 'vue'
import { getorders, go, del_order, addfood, del_foodpin } from '@/api/admin'
import { showxi } from '@/api/Cookingxi'
import { getcookingPin } from '@/api/CookingPin'
const tableData = ref([])
const menuItems = ref([])
const foodxis = ref([])
const datas = ref({})
const orders = ref({})
const s_user_id = ref('')
const drawer = ref(false)
const del_dialog = ref(false)
const tokenStore = useTokenStore()
const Authorization = tokenStore.token
const header = ref({ 'Authorization': Authorization })
const dform = reactive({
  id: ''
})
async function showxis() {
  foodxis.value = await (await showxi()).data
  console.log(foodxis.value)
}
showxis()

async function getcookingPins() {
  menuItems.value = await (await getcookingPin()).data
  console.log(menuItems.value)
}
getcookingPins()
const handleClose = (() => {
  ElMessageBox.confirm('确认关闭吗?')
    .then(() => {
      drawer.value = false
      foodmodule.name = ''
      foodmodule.class = ''
      foodmodule.imageurl = ''
      foodmodule.introduce = ''
    })
    .catch(() => {
      // catch error
    })
})
function handleclick() {
  if (dform.id === '') {
    ElMessage.warning({ message: '请选择', duration: 1500 });
  } else {
    del_dialog.value = false;
    del_foodpin(dform.id).catch(error => { console.error(error) });
  }
}
const foodmodule = reactive({
  name: "",
  class: '',
  imageurl: '',
  introduce: '',
  price: ''
})

function beforeAvatarUpload(rawFile) {
  console.log(rawFile)
  if (rawFile.type !== 'image/png' && rawFile.type !== 'image/jpeg') {
    ElMessage.error('图片格式不对')
    return false
  } else if (rawFile.size / 1024 / 1024 > 3) {
    ElMessage.error('图片大小超过3MB!')
    return false
  }
  return true
}

function uploadSuccess(result) {
  foodmodule.imageurl = result.data;
}
async function addfoods() {
  drawer.value = false
  await addfood(foodmodule.name, foodmodule.class, foodmodule.imageurl, foodmodule.price, foodmodule.introduce)
}

async function getorderss() {
  orders.value = (await getorders())
  tableData.value = orders.value.data
  console.log(tableData.value)
}
getorderss()

async function gos() {
  orders.value = await go(s_user_id.value)
  tableData.value = orders.value.data
  s_user_id.value = ''
  console.log(tableData.value)
}

function back() {
  getorderss()
  s_user_id.value = ''
}

async function del_orders(order_id) {
  await del_order(order_id)
  window.location.reload()
}
</script>



<template>
  <el-card style="max-width: 1300px; margin:8px; height:100%">
    <template #header>
      <el-row>
        <el-col :xs="4" :sm="6" :md="8" :lg="24" :xl="30" style="background-color: antiquewhite;">
          <div class="card-header">
            <h2>订单详情</h2>
          </div>
        </el-col>
        <el-col :xs="4" :sm="6" :md="8" :lg="24" :xl="30" style="background-color:hotpink">
          <el-button type="success" style="width: 100%" v-on:click="drawer = true">添加菜品
          </el-button>
          <el-button type="danger" style="width: 100%" v-on:click="del_dialog = true">删除菜品
          </el-button>
        </el-col>
      </el-row>

    </template>
    <el-form inline>
      <el-form-item label="搜寻:" style="width: 100%;">
        <el-input v-model="s_user_id" style="width: 255px" placeholder="请输入用户ID" />
        <el-button type="success" style="width: 5%" v-on:click="gos">go</el-button>
        <el-button type="primary" style="width: 5%" v-on:click="back">全部</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="tableData" height="500px" style="width: 100%">
      <el-table-column prop="order_id" label="订单编号" width="150" />

      <el-table-column prop="user_id" label="用户ID" width="150" />
      <el-table-column prop="sumarry" label="菜品详情" />
      <el-table-column prop="remark" label="备注" />
      <el-table-column prop="sum_price" label="总价/元" width="150" />
      <el-table-column prop="order_time" label="下单时间" width="300" />
      <el-table-column label="操作" width="180">
        <template v-slot="scope">
          <el-button type="danger" :icon="Delete" circle @click="del_orders(scope.row.order_id)" />
        </template>
      </el-table-column>
    </el-table>




    <el-drawer v-model="drawer" title="添加菜品" :direction="direction" :before-close="handleClose">
      <el-form :module="foodmodule">
        <el-form-item label="菜品的名字:"> <el-input v-model="foodmodule.name" style="width: 255px" placeholder="请输入菜品名" />
        </el-form-item>
        <el-form-item label="菜品的分类:"> <el-select placeholder="请选择" v-model="foodmodule.class" style="width: 150px">
            <el-option v-for="i in foodxis" :key="i.cookingxi_id" :label="i.cookingxi_name"
              :value="i.cookingxi_name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜品的图片:"><el-upload class="avatar-uploader" action="http://localhost:8080/upload"
            :show-file-list="false" name="file" :headers="header" :before-upload="beforeAvatarUpload"
            :on-success="uploadSuccess" :auto-upload="true">
            <img v-if="foodmodule.imageurl" :src="foodmodule.imageurl" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon">
              <Plus />
            </el-icon>

          </el-upload>
        </el-form-item>
        <el-form-item label="菜品的价格:"> <el-input v-model="foodmodule.price" style="width: 255px" placeholder="请输入价格" />
        </el-form-item>
        <el-form-item label="菜品的描述:">
          <el-input v-model="foodmodule.introduce" maxlength="30" style="width: 240px" placeholder="Please input"
            show-word-limit type="textarea" />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" style="width: 100%;" v-on:click="addfoods">添加</el-button>
        </el-form-item>

      </el-form>
    </el-drawer>

    <el-dialog v-model="del_dialog" title="删除菜品" width="400">
      <span>请按如下格式填写数据:</span>
      <el-form :model="dform" label-width="auto" style="max-width: 600px">

        <el-form-item label="菜品的名字:">
          <el-select placeholder="请选择" v-model="dform.id" style="width: 150px">
            <el-option v-for="i in menuItems" :key="i.cookingpin_id" :label="i.cookingpin_name"
              :value="i.cookingpin_id">
            </el-option>
          </el-select>
        </el-form-item>

      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleclick">确认</el-button>
        </div>
      </template>
    </el-dialog>
  </el-card>
</template>


<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  text-align: center;
}
</style>