<template>
  <div id="user" class="content">
    <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>消费者管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户信息</el-breadcrumb-item>
        <el-breadcrumb-item>用户信息修改</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="useredit" v-loading="loading">
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="用户名">
          <el-input v-model="form.username" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="真实姓名">
          <el-input v-model="form.realName" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="form.gender" :disabled="true">
            <el-radio label="男">男</el-radio>
            <el-radio label="女">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="form.phoneNumber"></el-input>
        </el-form-item>
        <el-form-item label="身份证号">
          <el-input v-model="form.idcardNumber" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="原特别码(推广码)">
          <el-input v-model="form.spreadCode" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="新特别码(推广码)">
          <el-input v-model="form.spreadCode2" placeholder="不设置请留空" class="inline-input"></el-input> 请输入1~9位数字
        </el-form-item>
        <el-form-item label="是否有效">
          <el-switch on-color="#13ce66" off-color="#f7ba2a" on-text="是" off-text="否" v-model="form.isDisabled"></el-switch>
        </el-form-item>
        <el-form-item>
          <el-button @click="onCancel">取消</el-button>
          <el-button type="primary" icon="circle-check" @click="onSubmit" style="width: 150px;">更 新</el-button>
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
        },
        loading: false
      }
    },
    created: function () {
      this.form = this.$store.state.member
      this.form.isDisabled = this.form.isDisabled === 0
    },
    methods: {
      onSubmit () {
        if (!/^\d{0}|\d{1,9}$/.test(this.form.spreadCode2)) {
          this.$message.warning('特别码格式不正确，请输入1~9位数字！')
          return
        }
        if (!/^1\d{10}$/.test(this.form.phoneNumber)) {
          this.$message.warning('手机号格式不正确，请重新输入！')
          return
        }
        this.loading = true
        this.form.isDisabled = this.form.isDisabled ? 0 : 1
        this.$axios.post(SITEURL.MEMBER_EDIT_URL, this.form).then(response => {
          this.loading = false
          if (response.data.success) {
            this.$message.success('操作成功，' + response.data.message)
          } else {
            this.$message.error('操作失败，' + response.data.message)
          }
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

<style>
  .inline-input {
    width: 72%;
  }
  .useredit {
    display: block;
    width: 40%;
    border: 1px solid #eaeefb;
    border-radius: 4px;
    transition: .2s;
    padding: 24px;
  }
</style>
