<template>
  <div id="app">
    <router-view name="menubar"></router-view>
    <el-row type="flex" class="" justify="left">
      <el-col :span="3">
        <router-view name="sidebar"></router-view>
      </el-col>
      <el-col :span="21">
        <router-view name="content"></router-view>
      </el-col>
    </el-row>

    <el-row type="flex" id="footer">
      <el-col :span="8">
        <span><h5>www.sobolong.cn</h5></span>
      </el-col>
      <el-col :span="8">
        <span><h5>Copyright: Sobolong Technology.</h5></span>
      </el-col>
      <el-col :span="8">
        <span><h5>Version: 1.9</h5></span>
      </el-col>
    </el-row>

  </div>
</template>

<script>
  export default {
    name: 'app',
    data () {
      return {
      }
    }
  }
</script>

<style scope>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }
</style>
