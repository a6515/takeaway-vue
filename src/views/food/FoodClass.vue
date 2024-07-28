<script setup>
import {
    Check,
    Delete,
    Edit,
    Message,
    Search,
    Star,
} from '@element-plus/icons-vue'
import { reactive } from 'vue'
import { ref } from 'vue'
import { showxi, add, del, edit } from '@/api/Cookingxi'
import { ElMessage } from 'element-plus'
const tempid = ref('')
const dialogVisible = ref(false)
const editsdialogVisible = ref(false)
const list = ref([])
const datas = ref({})
async function getall() {
    datas.value = await showxi();
    console.log(datas.value);
    list.value = datas.value.data;
}
getall().catch(error => { console.log(error) });
async function delxi(id) {
    await del(id).catch(error => { console.error(error) });
    await getall(); // 删除后重新获取数据
}
const form = reactive({
    name: ''
})
const rules = {
    name: [
        { required: true, message: "请输入菜系名", trigger: "blur" },
        { max: 10, message: "菜系名长度最多为10位", trigger: "blur" }
    ]
}
async function adds() {
    datas.value = await add(form.name)
    form.name=''
    console.log(datas.value)
    await getall()
}
function handleclick() {
    if (form.name === '' ) {
        ElMessage.warning({ message: '填写完整啊', duration: 1500 });
    } else {
        dialogVisible.value = false;
        adds();
    }
}
async function edits(){
    await edit(form.name, tempid.value);
    await getall();
}
function editsconfirm() {
    if (form.name === '') {
        ElMessage.warning({ message: '填写完整啊', duration: 1500 });
    } else {
       editsdialogVisible.value = false;
        edits();
        
    }
}

function temp(id) {
    tempid.value = id;
    form.name='';
    form.brief='';
    editsdialogVisible.value = true;
}

</script>

<template>
    <div class="table">
        <el-row class="head">
            <el-col :span="22">
                <h3>菜系分类</h3>
            </el-col>
            <el-col :span="2"><el-button type="success" style="margin:0%"
                    @click="dialogVisible = true">添加菜系</el-button></el-col>
        </el-row>

        <el-table :data="list" height="625" style="width: 100%">
            <el-table-column prop="cookingxi_id" label="菜系ID" />
            <el-table-column prop="cookingxi_name" label="菜系" />
            <el-table-column prop="hiredate" label="添加日期" />
            <el-table-column label="操作" width="200">
                <template v-slot="scope">
                    <el-button type="primary" :icon="Edit" circle @click="temp(scope.row.cookingxi_id)" />
                    <el-button type="danger" :icon="Delete" circle @click="delxi(scope.row.cookingxi_id)" />
                </template>
            </el-table-column>
        </el-table>
        <el-dialog v-model="dialogVisible" title="添加菜系" width="400">
            <span>请按如下格式填写数据:</span>
            <el-form :rules="rules" :model="form" label-width="auto" style="max-width: 600px">
                <el-form-item label="菜系名:" prop="name">
                    <el-input v-model="form.name" style="width: 255px" placeholder="请输入菜系名" />
                </el-form-item>
              
            </el-form>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="dialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="handleclick">确认</el-button>
                </div>
            </template>
        </el-dialog>
        <el-dialog v-model="editsdialogVisible" title="编辑菜系" width="400">
            <span>请按如下格式编辑菜系:</span>
            <el-form :rules="rules" :model="form" label-width="auto" style="max-width: 600px">
                <el-form-item label="菜系名:" prop="name">
                    <el-input v-model="form.name" style="width: 255px" placeholder="请输入菜系名" />
                </el-form-item>
            </el-form>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="dialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="editsconfirm">确认</el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<style scoped>
.table {
    position: relative;
    border: 5px;
}

.head {
    position: relative;
    background-color: white;
    width: 100%;
    padding: 0;
    margin: 0;
}
</style>
