<template>
  <div id="studentPassCheck" class="content">
    <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>会员管理</el-breadcrumb-item>
        <el-breadcrumb-item>学生计划</el-breadcrumb-item>
        <el-breadcrumb-item>已审核大学生</el-breadcrumb-item>
        <el-breadcrumb-item>查看</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="merchantedit" v-loading="loading">
      <el-row>
        <el-form ref="merchantForm" :model="form" label-width="100px" :label-position="labelPosition">
          <el-col :span="12" class="merchantinfo">
            <el-row>
              <el-col :span="12">
                <el-form-item label="姓名：">{{realName}}</el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="手机号：">{{phoneNumber}}</el-form-item>
            <el-form-item label="学校名称："> {{school}}</el-form-item>
            <el-form-item label="入学日期：">{{startTime}}</el-form-item>
            <el-form-item label="学制：">{{period}}</el-form-item>
            <el-form-item label="学号：">{{studentNumber}}</el-form-item>
            <el-form-item label="可兑换积分：">{{initIntegral}}</el-form-item>
            <el-form-item label="现金余额：">{{userAmount_cash}}</el-form-item>
            <el-form-item label="积分余额：">{{userAmount_integral}}</el-form-item>
            <el-form-item label="下级人数：">{{student_subordinate_num}}</el-form-item>
          </el-col>
          <el-col :span="12" class="merchantimg">
            <el-row>
              <el-tabs v-model="activeName">
                <el-tab-pane label="凭证" name="first">
                  <img :src="src" alt="" @click="photoZoom(src)">
                </el-tab-pane>
              </el-tabs>
            </el-row>
          </el-col>
          <el-dialog v-model="dialogVisible" size="tiny">
            <img width="100%" height="100%" :src="src">
          </el-dialog>
        </el-form>
      </el-row>
    </div>

    
  </div>
</template>

<script>
  export default {
    name: 'user',
    data () {
      return {
        dialogVisible: false,
        form: {},
        activeName: 'first',
        loading: false,
        labelPosition: 'right'
      }
    },
    created: function () {
      // 从vuex里取值
      this.realName = this.$store.state.student.realName
      this.phoneNumber = this.$store.state.student.phoneNumber
      this.school = this.$store.state.student.school
      this.startTime = this.$store.state.student.startTime
      this.degree = this.$store.state.student.degree
      this.period = this.$store.state.student.period
      this.studentNumber = this.$store.state.student.studentNumber
      this.student_subordinate_num = this.$store.state.student.student_subordinate_num
      this.userAmount_integral = this.$store.state.student.userAmount_integral
      this.userAmount_cash = this.$store.state.student.userAmount_cash
      this.initIntegral = this.$store.state.student.student_integral
      this.src = this.$store.state.student.studentIdCard
    },
    methods: {
      photoZoom (url) {
        this.dialogVisible = true
      }
    }
  }
</script>

<style scoped>
  .merchantedit {
    display: block;
    border: 1px solid #eaeefb;
    border-radius: 4px;
    transition: .2s;
    padding: 24px;
    height: 840px;
  }
  .merchantinfo {
    padding-left: 50px;
    padding-top:4px;
  }
  .merchantimg {
    padding-left: 50px;
  }
  .inline-input {
    width: 100%;
  }
  .merchantimg img{
    max-width:500px;
    max-height: 500px;
  }
</style>
