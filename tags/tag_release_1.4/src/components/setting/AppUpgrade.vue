<template>
  <div id="user" class="content">
    <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>系统管理</el-breadcrumb-item>
        <el-breadcrumb-item>平台设置</el-breadcrumb-item>
        <el-breadcrumb-item>APP升级</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="setting" v-loading="loading">
      <el-form ref="form" :model="form" label-width="160px">
        <el-form-item label="安卓版本">
          <el-input v-model="form.androidVersion"></el-input>
        </el-form-item>
        <el-form-item label="安卓下载地址">
          <el-input v-model="form.androidUrl"></el-input>
        </el-form-item>
        <el-form-item label="安卓升级描述">
          <el-input type="textarea" :rows="5" v-model="form.androidVersionDes"></el-input>
        </el-form-item>
        <el-form-item label="iOS版本">
          <el-input v-model="form.iosVersion"></el-input>
        </el-form-item>
        <el-form-item label="iOS下载地址">
          <el-input v-model="form.iosUrl"></el-input>
        </el-form-item>
        <el-form-item label="iOS升级描述">
          <el-input type="textarea" :rows="5" v-model="form.iosVersionDes"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button @click="onCancel">取消</el-button>
          <el-button type="primary" @click="onSubmit">更新</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import * as SITEURL from '@/store/app-urls'
  export default {
    name: 'user',
    data () {
      return {
        form: {},
        loading: false
      }
    },
    created: function () {
      this.form = this.$store.state.customer
      this.form.isDisabled = this.form.isDisabled !== 1
    },
    methods: {
      onSubmit () {
        this.loading = true
        this.$axios.post(SITEURL.MEMBER_EDIT_URL, {id: this.form.id, isDisabled: this.form.isDisabled, password: this.form.password}).then(response => {
          this.loading = false
          this.$message({
            showClose: true,
            type: 'success',
            message: '操作成功，' + response.data.message
          })
          this.$router.go(-1)
        }).catch(error => {
          this.loading = false
          console.log(error)
        })
      },
      onCancel () {
        this.$router.go(-1)
      },
      handleCurrentChange (val) {
        this.currentPage = val
        console.log(`当前页: ${val}`)
      }
    }
  }
</script>

<style scoped>
  .breadcrumb {
    margin: 20px 0 20px 0;
  }
  .setting {
    display: block;
    width: 50%;
    border: 1px solid #eaeefb;
    border-radius: 4px;
    transition: .2s;
    padding: 24px;
  }
</style>
