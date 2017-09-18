<template>
  <el-menu theme="light" :router="true" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
    <el-menu-item index="/">主页</el-menu-item>
    <el-menu-item index="/list"><i class="fa fa-flag" aria-hidden="true"></i> 探索</el-menu-item>
    <template v-if="user">
      <!-- <el-menu-item index="6" class="right" @click="handleExit"><i class="fa fa-sign-out" aria-hidden="true"></i> 注销</el-menu-item> -->
      <li class="el-menu-item right" @click="handleExit"><i class="fa fa-sign-out" aria-hidden="true"></i> 注销</li>
      <el-submenu index="5" class="right">
      <span slot="title"> {{ user.getUsername() }} </span>
      <el-menu-item index="5-1">个人中心</el-menu-item>
      <el-menu-item index="5-2">发布文章</el-menu-item>
      <el-menu-item index="5-3">消息</el-menu-item>
      </el-submenu>
    </template>
    <template v-else>
      <el-menu-item index="/signUp" class="right"><i class="fa fa-user-o" aria-hidden="true"></i> 注册</el-menu-item>
      <el-menu-item index="3" class="right"><i class="fa fa-key" aria-hidden="true"></i> 登陆</el-menu-item>
    </template>
  </el-menu>
</template>

<script>
import { mapState,mapActions } from 'vuex'
export default {
  data () {
    return {
      activeIndex: '/'
    }
  },
  computed: mapState(['user']),
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    },
    ...mapActions(['exit']),
    handleExit () {
      this.exit();
      this.$api.SDK.User.logOut();
      this.$message.success('注销成功');
    }
  }
}
</script>

<style lang="css" scoped>
  .right {
    float: right;
  }
</style>
