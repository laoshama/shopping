<template>
  <el-container class="home_box">
    <!--页面头部-->
    <el-header>
      <div class="header_left">
        <img class="header_logo" src="../assets/logo.png" alt="logo">
        <span>某某公司电商后台管理系统</span>
      </div>
      <el-button type="info" round @click="logout">退出系统</el-button>
    </el-header>
    <!--主体区域-->
    <el-container>
      <!--侧边栏-->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="aside_toggleBtn" :collaspase="isCollapse" @click="toggleCollaspase">|||</div>
        <el-menu default-active="2" background-color="#373d41" text-color="#fff" class="el-menu-vertical-demo"
                 unique-opened :collapse="isCollapse"
                 :collapse-transition="false" router>
          <!--循环生成一级菜单-->
          <el-submenu :index="menu.path + ''" v-for="menu in menuList" :key="menu.id">
            <template slot="title">
              <i :class="iconsObj[menu.id]"></i>
              <span>{{ menu.authName }}</span>
            </template>
            <template>
              <!--循环生成二级菜单-->
              <el-menu-item :index="menu.path + '/' + child_menu.path" v-for="child_menu in menu.children"
                            :key="child_menu.id">
                <i class="el-icon-menu"></i>
                <span>{{ child_menu.authName }}</span>
              </el-menu-item>
            </template>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!--右侧内容区-->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      //  侧边栏菜单数据
      menuList: [],
      iconsObj: {
        125: 'el-icon-s-custom',
        103: 'el-icon-s-opportunity',
        101: 'el-icon-goods',
        102: 'el-icon-thumb',
        145: 'el-icon-s-data'
      },
      isCollapse: true,
      aside_with: '64px'
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
    },
    toggleCollaspase () {
      this.isCollapse = !this.isCollapse
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
        font-weight: 500;
      }
    }

    .el-button {
      height: 40px;
      margin-right: 10px;
    }
  }

  .el-aside {
    background-color: #333744;

    .aside_toggleBtn {
      background-color: #4a5064;
      color: #fff;
      text-align: center;
      font-size: 10px;
      cursor: pointer;
      line-height: 24px;
      letter-spacing: .2em;
    }

    .el-menu {
      border-right: none;

      .el-menu-item {
        background-color: peru !important;
      }

      .el-menu-item.is-active {
        color: #6681FA !important;
        background-color: #EAEEFF!important;
      }
    }
  }

  .el-main {
    background-color: #2b4b6b;
    color: #fff1f0;
  }
</style>
