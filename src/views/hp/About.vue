<template>
    <div class="container">
        <!-- 导航条 -->
        <router-view></router-view>
    </div>

    <div class="about-container">
        <h1>关于我们</h1>
        <p>车城167号餐厅是一家致力于提供高品质美食体验的餐厅。我们引以为傲的是使用新鲜、优质的食材，并结合精湛的烹饪技艺，为您呈现丰富多样的美食选择。</p>
        <p>我们的使命是通过独特的味觉享受，让每位顾客在车城167号餐厅都能体验到无与伦比的美食魅力。</p>
        <p>无论是家庭聚餐、朋友聚会还是商务宴请，我们都致力于为您提供难忘的美好回忆。</p>
        <br>
        <p>车城167号餐厅不仅注重食材和烹饪技艺，还秉持着对服务质量的严格要求。</p>
        <p>我们的热情服务团队将竭诚为您提供舒适愉悦的就餐环境，确保您在每一次光临中都能感受到家的温暖和专业的服务。</p>
        <br>
        <p>无论您是追求美食的饕餮之客，还是寻求愉快就餐体验的顾客，车城167号餐厅都将竭诚欢迎您的到来。</p>
        <p>让我们用热情和美味，为您的每一次光临增添特别的价值！</p>
    </div>
</template>

<script setup>
</script>

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

.about-container {
    max-width: 800px;
    margin: 10px auto;
    padding: 20px;
    background-color: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    text-align: justify;
    line-height: 1.6;
}
</style>