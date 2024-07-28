<script setup>
import useuserStore from '../../stores/user_info'
import { useRouter } from 'vue-router'
const router = useRouter()
const imgList = [
  { path: require('../../images/好吃的1.jpg') },
  { path: require('../../images/好吃的2.jpg') },
  { path: require('../../images/好吃的3.jpg') },
  { path: require('../../images/好吃的4.jpg') },
  { path: require('../../images/logo2.png') },
];

const stores = useuserStore()
console.log(stores.info)
function go(){
   router.push('/Menu')
}
</script>
<template>
  <div class="container">
    <!-- 导航条 -->
    <router-view></router-view>
    <!-- 走马灯 -->
    <div class="carousel-container">
      <el-carousel :interval="1000" type="card" height="280px" width="300px" autoplay>
        <el-carousel-item v-for="item in imgList" :key="item.path" @click="go">
          <img :src="item.path" style="width: 100%; height: 100%; object-fit: cover;" />
        </el-carousel-item>
      </el-carousel>
    </div>

    <!-- 底部内容 -->
    <footer class="footer">
      <div class="footer-info">
        <p>联系我们：123-456-7890</p>
        <p>营业时间：周一至周五，9:30 - 22:00</p>
        <p>双休日，10:30 - 20:30</p>
        <p>&copy; 2024 Your Company. All Rights Reserved.</p>
      </div>

      <div class="quick-links">
        <ul>
          <li><a href="http://localhost:8080/HomePage">网站地图</a></li>
          <li><a href="#">客官请给个五星好评！！</a></li>
        </ul>
      </div>

      <div class="recommendation">
        <h4>最新文章</h4>
        <ul>
          <li><a href="#">如何做美味的家常菜</a></li>
          <li><a href="#">节日优惠活动</a></li>
        </ul>
      </div>
    </footer>
  </div>
</template>



<style scoped>
.container {
  background-color: rgb(234, 233, 232);
  position: relative;
  font-family: Arial, sans-serif;
}

.carousel-container {
  position: relative;
  padding-top: 5px;
  width: 100%;
  height: 300px;
}

.footer {
  background-color: rgb(234, 233, 232);
  color: rgb(11, 11, 11);
  padding: 20px;
  position: relative;
}

.footer-info,
.quick-links,
.recommendation {
  margin-bottom: 10px;
}

.quick-links ul {
  list-style: none;
  padding: 0;
}

.recommendation ul {
  list-style: none;
  padding: 0;
}
</style>
