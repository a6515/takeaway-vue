<script setup>
import { ref, computed } from 'vue'
import { getcookingPin } from '@/api/CookingPin'
import { ElMessage } from 'element-plus'
import { showxi } from '@/api/Cookingxi'
import { buy } from '@/api/User'
import useuserStore from '../../stores/user_info'
const stores = useuserStore()
const categories = ref([])
const datas = ref({})
const selectedCategory = ref('');
const menuItems = ref([])

const filteredItems = computed(() => menuItems.value.filter(item => item.cookingxi_name === selectedCategory.value))
async function showxis() {
    categories.value = await (await showxi()).data
    console.log(categories.value)
    selectedCategory.value=categories.value[0].cookingxi_name
    
}
showxis()
async function getcookingPins() {
    menuItems.value = await (await getcookingPin()).data
    console.log(menuItems.value)
}
getcookingPins()

function selectCategory(category) {
    selectedCategory.value = category.cookingxi_name
}

async function addToCart(item) {
    try {
        datas.value = await buy(stores.info.user_id, item.cookingpin_name)
        ElMessage.success({ message: `已将 ${item.cookingpin_name} 添加到购物车`, duration: 1500 });
        datas.value = {}
        console.log(datas.value)
    } catch (error) {
        console.log(error)
    }

}


</script>
<template>
    <div class="container">
        <!-- 导航条 -->
        <router-view></router-view>

        <div class="content">
            <div class="sidebar">
                <h3>菜单分类</h3>
                <ul>
                    <li v-for="category in categories" :key="category.cookingxi_id" @click="selectCategory(category)"
                        :class="{ active: selectedCategory === category.cookingxi_name }">
                        {{ category.cookingxi_name }}
                    </li>
                </ul>
            </div>

            <div class="menu-container">
                <h2>{{ selectedCategory }}</h2>
                <div class="menu-items">
                    <div v-for="item in filteredItems" :key="item.cookpinid" class="menu-item">
                        <img :src="item.picture" alt="菜品图片" class="item-image">
                        <div class="item-details">
                            <h3>{{ item.cookingpin_name }}</h3>
                            <p>价格：{{ item.price }} 元</p>
                            <button @click="addToCart(item)">添加到购物车</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>



<style scoped>
.container {
    background-color: #f7f7f7;
    font-family: Arial, sans-serif;
    height: 5vh;
}


.content {
    display: flex;
    margin-top: 20px;
    padding-top: 0;
}

.sidebar {
    width: 200px;
    background-color: #fff;
    padding: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.sidebar h3 {
    margin-bottom: 10px;
}

.sidebar ul {
    padding: 0;
    list-style-type: none;
}

.sidebar li {
    padding: 10px;
    cursor: pointer;
}

.sidebar li.active {
    font-weight: bold;
    background-color: #f0f0f0;
}

.menu-container {
    flex: 1;
    margin-left: 20px;
}

.menu-items {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
}

.menu-item {
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    padding: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
}

.item-image {
    width: 100%;
    height: 150px;
    object-fit: cover;
    border-radius: 8px;
    margin-bottom: 10px;
}

.item-details h3 {
    margin-bottom: 10px;
}

.item-details p {
    margin-bottom: 10px;
}

button {
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

button:hover {
    background-color: #0056b3;
}
</style>
