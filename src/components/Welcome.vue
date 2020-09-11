<template>
    <div class="box">
      <div class="inner_box">
        <h2>Welcome!</h2>
        <img src="../assets/logo.png" alt=""></div>
    </div>
</template>

<script>
export default {
  name: 'Welcome'
}
</script>

<style lang="less" scoped>
  *{
    margin: 0;
    padding: 0;
  }

  .box{
    display: flex;
    height: 100%;
    text-align: center;
    font-size: 50px;
    justify-content: center;
    align-items: center;

    .inner_box{
      height: 300px;
    }
  }
</style>
