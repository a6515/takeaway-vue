<script setup>
import { ElButton, ElIcon, ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { useTokenStore } from '@/stores/token.js'
import { uupdateAvatar } from '@/api/User'
import useuserStore from '../../stores/user_info'
const stores = useuserStore()
const imageUrl = ref(stores.info.avatar)
const tokenStore = useTokenStore()
const Authorization = tokenStore.token
const header = ref({ 'Authorization': Authorization })
async function apply() {
    await uupdateAvatar(imageUrl.value);
    stores.info.avatar=imageUrl.value;
}
async function uploadSuccess(result) {
    imageUrl.value = result.data;
    await apply();
}

function beforeAvatarUpload(rawFile) {
    console.log(rawFile)
    if (rawFile.type !== 'image/png' && rawFile.type !== 'image/jpeg') {
        ElMessage.error('图片格式不对')
        return false
    } else if (rawFile.size / 1024 / 1024 > 2) {
        ElMessage.error('图片大小超过2MB!')
        return false
    }
    return true
}
</script>



<template>
    <el-card style="max-width: 1200px; margin-left:35px;">
        <template #header>
            <div class="card-header">
                <span>基本资料</span>
            </div>
        </template>
        <div>
            <el-row gutter="20">
                <el-col :xs="4" :sm="6" :md="8" :lg="7" :xl="30" style="background-color:hotpink">
                    <h2>用户头像</h2>
                    <el-button type="success" style="width: 72%">点击右方图片上传或更改头像</el-button>
                </el-col>
                <el-col :xs="4" :sm="6" :md="8" :lg="7" :xl="30" style="background-color: aqua;">
                    <div>
                        <el-upload class="avatar-uploader" action="http://localhost:8080/upload" :show-file-list="false"
                            name="file" :headers="header" :before-upload="beforeAvatarUpload"
                            :on-success="uploadSuccess" :auto-upload="true">
                            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                            <el-icon v-else class="avatar-uploader-icon">
                                <Plus />
                            </el-icon>

                        </el-upload>
                    </div>

                </el-col>
            </el-row>
            <el-row>
                <el-col :xs="4" :sm="6" :md="8" :lg="7" :xl="30" style="background-color:aquamarine">
                    <h2>用户ID(务必谨记):</h2>
                </el-col>
                <el-col :xs="4" :sm="6" :md="8" :lg="7" :xl="30" style="background-color:antiquewhite">{{
                    stores.info.user_id
                }}</el-col>
            </el-row>
        </div>
        <template #footer>版权所有@天下无敌</template>
    </el-card>
</template>

<style scoped>
.demo-type {
    display: flex;
}

.demo-type>div {
    flex: 1;
    text-align: center;
}

.demo-type>div:not(:last-child) {
    border-right: 1px solid var(--el-border-color);
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
    width: 178px;
    height: 178px;
    text-align: center;
}
</style>
