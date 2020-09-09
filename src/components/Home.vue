<template>
  <el-container class="home_box">
    <!--页面头部-->
    <el-header>
      <div class="header_left">
        <img class="header_logo" src="../assets/logo.png" alt="logo">
        <span>某某公司电商后台管理</span>
      </div>
      <el-button type="info" round @click="logout">退出系统</el-button>
    </el-header>
    <!--主体区域-->
    <el-container>
      <!--侧边栏-->
      <el-aside width="200px">
        <el-menu
          v-for="(menu) in menuList" :key="menu.id"
          default-active="2" background-color="#545c64" text-color="#fff" class="el-menu-vertical-demo">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{ menu.authName }}</span>
            </template>
            <template>
              <el-menu-item index="1-1" v-for="(child_menu) in menu.children" :key="child_menu.id">
                <i class="el-icon-location"></i>
                <span>{{ child_menu.authName }}</span>
              </el-menu-item>
            </template>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!--右侧内容区-->
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      //  侧边栏菜单数据
      menuList: []
    }
  },
  //  在创建完实例后就发送请求
  created () {
    this.getMenuList()
  },
  methods: {
    //  退出登入
    logout () {
      //  销毁本地token
      window.sessionStorage.clear()
      //  跳转到登入页面
      this.$router.push('/login')
    },
    //  获取菜单列表
    async getMenuList () {
    //  get menus
      const { data: res } = await this.$http.get('menus')
      if (res.meta.status !== 200) return this.$message.error('信息获取失败！')
      this.menuList = res.data
    }
  }
}
</script>

<style lang= "less" scoped>
  .home_box {
    height: 100%;
  }

  .el-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0;
    background-color: #373d41;

    .header_left {
      display: flex;
      align-items: center;
      font-size: 20px;

      .header_logo {
        width: 60px;
      }

      span{
        margin-left: 30px;
        color: #dddddd;
      }
    }

    .el-button {
      height: 40px;
      margin-right: 10px;
    }
  }

  .el-aside {
    background-color: #333744;
    .el-submenu {
      width: 200px;
    }
  }

  .el-main {
    background-color: #eaedc1;
  }

</style>
