<script setup>
import { ref } from 'vue'
import { ElButton } from 'element-plus'
import { u_getorder } from '@/api/User'
import useuserStore from '../../stores/user_info'
const stores = useuserStore()
const tableData = ref([])
const foodxis = ref([])
const orders = ref({})
async function getorderss() {
  orders.value = (await u_getorder(stores.info.user_id))
  tableData.value = orders.value.data
  console.log(tableData.value)
}
getorderss()


</script>



<template>
  <el-card class="main-card">
    <template #header>
      <el-row>
        <el-col :span="24" class="card-header">
          <h2>订单详情</h2>
        </el-col>
      </el-row>
    </template>

    <el-table :data="tableData" height="500px" style="width: 100%">
      <el-table-column prop="order_id" label="订单编号" width="150" />
      <el-table-column prop="user_id" label="用户ID" width="150" />
      <el-table-column prop="sumarry" label="菜品详情" />
      <el-table-column prop="remark" label="备注" />
      <el-table-column prop="sum_price" label="总价/元" width="150" />
      <el-table-column prop="order_time" label="下单时间" width="300" />
    </el-table>

    <el-drawer v-model="drawer" title="添加菜品" :before-close="handleClose">
      <el-form :model="foodmodule">
        <el-form-item label="菜品的名字:">
          <el-input v-model="foodmodule.name" style="width: 255px" placeholder="请输入菜品名" />
        </el-form-item>
        <el-form-item label="菜品的分类:">
          <el-select placeholder="请选择" v-model="foodmodule.class" style="width: 150px">
            <el-option v-for="i in foodxis" :key="i.cookingxi_id" :label="i.cookingxi_name"
              :value="i.cookingxi_name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜品的图片:">
          <el-upload class="avatar-uploader" action="http://localhost:8080/upload" :show-file-list="false" name="file"
            :headers="header" :before-upload="beforeAvatarUpload" :on-success="uploadSuccess" :auto-upload="true">
            <img v-if="foodmodule.imageurl" :src="foodmodule.imageurl" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon">
              <Plus />
            </el-icon>
          </el-upload>
        </el-form-item>
        <el-form-item label="菜品的价格:">
          <el-input v-model="foodmodule.price" style="width: 255px" placeholder="请输入价格" />
        </el-form-item>
        <el-form-item label="菜品的描述:">
          <el-input v-model="foodmodule.introduce" maxlength="30" style="width: 240px" placeholder="请输入描述"
            show-word-limit type="textarea" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width: 100%;" v-on:click="addfoods">添加</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
  </el-card>
</template>



<style scoped>
.main-card {
  max-width: 1300px;
  margin: 8px;
  height: 100%;
}

.card-header {
  background-color: antiquewhite;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

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
