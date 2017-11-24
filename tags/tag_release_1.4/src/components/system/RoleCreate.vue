<template>
  <div id="user" class="content">
    <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>系统管理</el-breadcrumb-item>
        <el-breadcrumb-item>权限管理</el-breadcrumb-item>
        <el-breadcrumb-item>角色设置</el-breadcrumb-item>
        <el-breadcrumb-item>新建角色</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="useredit" v-loading="loading">
      <el-form ref="roleForm" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="角色标签" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="角色名称" prop="display_name">
          <el-input v-model="form.display_name"></el-input>
        </el-form-item>
        <el-form-item label="角色简介">
          <el-input v-model="form.description"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="onCancel">取 消</el-button>
          <el-button type="info" icon="circle-check" @click="onSubmit('roleForm')" style="width: 150px;">提 交</el-button>
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
        form: {
          name: '',
          display_name: '',
          description: ''
        },
        loading: false,
        rules: {
          name: [
            { required: true, message: '角色标签不能为空，且只能为英文和数字组合', trigger: 'blur' }
          ],
          display_name: [
            { required: true, message: '角色名称不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    created: function () {
    },
    methods: {
      onSubmit (formName) {
        // 表单验证
        if (!this.form.name) {
          this.$message({
            showClose: true,
            type: 'warning',
            message: '角色标签只能为英文、数字、"—"及"_"组合！'
          })
          return
        }
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.loading = true
            this.$axios.post(SITEURL.SYSTEM_ROLE_CREATE, this.form).then(response => {
              this.loading = false
              if (response.data.success) {
                this.$message.success('操作成功，' + response.data.message)
              } else {
                this.$message.error('操作失败，' + response.data.message)
              }
              this.$router.push({ path: '/system/role' })
            }).catch(error => {
              this.loading = false
              console.log(error)
            })
          } else {
            this.loading = false
            console.log('error submit!!')
            return false
          }
        })
      },
      onCancel () {
        this.$router.go(-1)
      }
    }
  }
</script>

<style>
  .breadcrumb {
    margin: 20px 0 20px 0;
  }
  .useredit {
    display: block;
    width: 40%;
    border: 1px solid #eaeefb;
    border-radius: 4px;
    transition: .2s;
    padding: 24px;
  }
  .inline-input {
    width: 100%;
  }
</style>
