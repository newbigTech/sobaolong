<template>
  <div id="user" class="content">
    <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>资讯与广告</el-breadcrumb-item>
        <el-breadcrumb-item>公告管理</el-breadcrumb-item>
        <el-breadcrumb-item>修改公告</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="notice-edit" v-loading="loading">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="公告标题">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="通知种类">
          <el-select v-model="form.noticeType" placeholder="请选择">
            <el-option v-for="item in noticeTypeOptions" :label="item.label" :value="item.value" :key="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="立即发布">
          <el-switch on-color="#13ce66" off-color="#f7ba2a" on-text="是" off-text="否" v-model="isShow"></el-switch>
        </el-form-item>
        <el-form-item label="公告内容">
          <el-input type="textarea" :rows="8" placeholder="请填写公告内容" v-model="form.content"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="onCancel">取消</el-button>
          <el-button type="primary" icon="circle-check" @click="onSubmit" style="width: 150px;">提 交</el-button>
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
        noticeTypeOptions: this.$store.state.snatchNoticeType,
        form: {},
        isShow: true,
        loading: false
      }
    },
    created: function () {
      this.form = this.$store.state.snatchNotice
      this.isShow = this.form.isShow === 1
    },
    methods: {
      onSubmit () {
        this.form.isShow = this.isShow ? 1 : 0
        this.loading = true
        this.$axios.post(SITEURL.SNATCH_NOTICE_EDIT, this.form).then(response => {
          this.loading = false
          if (response.data.success) {
            this.$message.success('操作成功，' + response.data.message)
            this.$router.go(-1)
          } else {
            this.$message.error('操作失败，' + response.data.message)
          }
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
  .breadcrumb {
    margin: 20px 0 20px 0;
  }
  .notice-edit {
    display: block;
    width: 50%;
    border: 1px solid #eaeefb;
    border-radius: 4px;
    transition: .2s;
    padding: 24px;
  }
</style>
