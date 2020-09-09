<template>
  <div class="home">
      <el-button type="danger" round @click="logout">退出登入</el-button>
  </div>
</template>

<script>
export default {
  name: 'Home',
  methods: {
    //  退出登入
    logout () {
      //  销毁本地token
      window.sessionStorage.clear()
      //  跳转到登入页面
      this.$router.push('/login')
    }
  }
}
</script>

<style lang= "less" scoped>

</style>
