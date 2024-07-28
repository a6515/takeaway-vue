<script setup>
import { ref } from 'vue'
import { getcart, cart_add, cart_remove, cart_del, pay } from '@/api/User'
import useuserStore from '../../stores/user_info'
import router from '@/router';

const stores = useuserStore()
const cartItems = ref([])
const sum_money = ref(0)
const overallNote = ref('') // 总备注
const sumarry=ref('')
async function getCarts() {
    cartItems.value = await (await getcart(stores.info.user_id)).data
    console.log(cartItems.value)
}
getCarts().catch(err => { console.log(err) });

function getTotal() {
    sum_money.value = 0
    sumarry.value = ''
    var item
    const length = cartItems.value.length
    let index = 0
    
    for (item of cartItems.value) {
        sum_money.value += item.cooking_number * item.price
        sumarry.value += item.cookingpin_name
        index++
        if (index < length) {
            sumarry.value += ','
        }
    }
}


setTimeout(() => {
    getTotal() // 实时计算价格
}, 500);

async function incrementQuantity(item) {
    item.cooking_number++;
    await cart_add(item.user_id, item.cookingpin_name)
    getTotal()
}

async function decrementQuantity(item) {
    if (item.cooking_number > 1) {
        item.cooking_number--;
    }
    await cart_del(item.user_id, item.cookingpin_name)
    getTotal()
}

async function removeItem(item) {
    await cart_remove(item.user_id, item.cookingpin_name)
    window.location.reload()
    getTotal()
}

function go() {
    router.push('/Menu')
}

async function pays() {
    await pay(stores.info.user_id, sum_money.value,overallNote.value,sumarry.value)
    sum_money.value = 0
    overallNote.value=''
    sumarry.value=''
    router.push('/Cart')
    window.location.reload()
}
</script>

<template>
    <div class="container">
        <!-- 导航条 -->
        <router-view></router-view>
    </div>

    <div class="cart-container">
        <h2>购物车</h2>
        <div v-if="cartItems.length === 0" class="empty-cart">
            <p>购物车是空的，赶快去选购您喜爱的美食吧！</p>
            <el-button type="primary" @click="go">Go</el-button>
        </div>
        <div v-else>
            <div class="cart-items">
                <div v-for="item in cartItems" :key="item.cookingpin_id" class="cart-item">
                    <img :src="item.picture" alt="菜品图片" class="item-image">
                    <div class="item-details">
                        <h3>{{ item.cookingpin_name }}</h3>
                        <p>简介:{{ item.introduce }}</p>
                        <p>价格：{{ item.price }} 元</p>
                        <div class="item-controls">
                            <button @click="decrementQuantity(item)" :disabled="item.cooking_number === 1">-</button>
                            <span>{{ item.cooking_number }}</span>
                            <button @click="incrementQuantity(item)">+</button>
                            <button @click="removeItem(item)">移除</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="overall-note">
                <label for="overallNote">客户备注：</label>
                <textarea v-model="overallNote" id="overallNote" placeholder="输入备注"></textarea>
            </div>
            <div class="cart-summary">
                <h3>购物车总计</h3>
                <p>总金额：{{ sum_money }} 元</p>
                <el-button type="primary" @click="pays">结算</el-button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.container {
    background-color: rgb(179, 158, 130);
    position: relative;
    font-family: Arial, sans-serif;
}

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

.cart-container {
    max-width: 800px;
    margin: 20px auto;
    padding: 20px;
    background-color: #f0f0f0;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.empty-cart {
    text-align: center;
    margin-top: 20px;
}

.btn {
    display: inline-block;
    padding: 10px 20px;
    background-color: #007bff;
    color: #fff;
    text-decoration: none;
    border-radius: 5px;
    margin-top: 10px;
}

.cart-items {
    margin-top: 10px;
}

.cart-item {
    display: flex;
    margin-bottom: 10px;
    padding: 10px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}

.item-image {
    width: 120px;
    height: 120px;
    object-fit: cover;
    border-radius: 8px;
    margin-right: 10px;
}

.item-details {
    flex: 1;
}

.item-details h3 {
    margin-bottom: 5px;
}

.item-details p {
    margin-bottom: 5px;
}

.item-controls {
    margin-top: 10px;
}

.item-controls button {
    padding: 5px 10px;
    margin-right: 5px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.item-controls button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
}

.overall-note {
    margin-top: 20px;
}

.overall-note textarea {
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
    resize: vertical;
}
</style>
