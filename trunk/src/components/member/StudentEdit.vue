<template>
  <div id="studentEdit" class="content">
    <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>会员管理</el-breadcrumb-item>
        <el-breadcrumb-item>学生计划</el-breadcrumb-item>
        <el-breadcrumb-item>待审核大学生</el-breadcrumb-item>
        <el-breadcrumb-item>编辑</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="merchantedit" v-loading="loading">
      <el-row>
        <el-form ref="studentForm":rules="rules" :model="form"  label-width="100px">
          <el-col :span="12" class="merchantinfo">
            <el-row>
              <el-col :span="8">
                <el-form-item label="姓名">
                  <el-input v-model="realName" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10">
                <el-form-item label="手机号">
                    <el-input v-model="phoneNumber" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="15">
                <el-form-item label="学校名称">
                  <el-input v-model="form.school" placeholder="请填写学校名称"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            
              <el-form-item label="入学日期" :required="true" >
                <!-- <div>
                  <el-date-picker  v-model="form.startTime"  :picker-options="pickerOptions0" type="date"  placeholder="选择日期" @change="dateChange">
                  </el-date-picker>
                </div> -->
                <div class="block">
                  <el-date-picker
                    v-model="form.startTime"
                    type="date"
                    placeholder="选择日期"
                    :picker-options="pickerOptions0" @change="dateChange">
                  </el-date-picker>
                </div>
              </el-form-item>
            
            <el-row>
              <el-col :span="20">
                <el-form-item label="学历" :required="true">
                   <el-radio class="radio" v-model="radio" label="1">专科</el-radio>
                   <el-radio class="radio" v-model="radio" label="2">本科</el-radio>
                   <el-radio class="radio" v-model="radio" label="3">研究生</el-radio>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10">
                <el-form-item label="学制" :required="true">
                  
                  <el-select  v-model="periods" placeholder="请修改学制">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>

                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="学号" :required="true" class="studentIdwrap">
                  <el-input v-model="form.studentNumber"></el-input>
                </el-form-item>
               
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="可兑换积分"  class="studentIdwrap">
                  <el-input v-model="student_integral" :disabled="true"></el-input>
                </el-form-item>
               
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="现金金额"  class="studentIdwrap">
                  <el-input v-model="userAmount_cash" :disabled="true"></el-input>
                </el-form-item>
               
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="积分余额"  class="studentIdwrap">
                  <el-input v-model="form.initIntegral" :disabled="true"></el-input>
                </el-form-item>
               
              </el-col>
            </el-row>

             <el-row>
              <el-col :span="12">
                <el-form-item label="下级人数"  class="studentIdwrap">
                  <el-input v-model="student_subordinate_num"  :disabled="true"></el-input>
                </el-form-item>
               
              </el-col>
            </el-row>

            <el-form-item label="审核状态" :required="true">
               <el-radio class="radio" v-model="radioStatus" label="1">通过</el-radio>
               <el-radio class="radio" v-model="radioStatus" label="2">驳回</el-radio>
            </el-form-item>
            <el-form-item label="驳回原因"  prop="remark" :required="true" v-if="radioStatus==='2'">
              <el-input v-model="form.remark" placeholder="请输入驳回原因"></el-input>
            </el-form-item>
            <el-form-item style="margin-top: 20px">
              <el-button @click="onCancel">返回</el-button>
              <el-button type="info" icon="circle-check" @click="onSubmit('studentForm')" :disabled="submitBtnDis" style="width: 150px;">确定</el-button>
            </el-form-item>
          </el-col>

          <el-col :span="12" class="merchantimg">
            <el-row>
              <el-tabs v-model="activeName">
                <el-tab-pane label="凭证" name="first">
                  <img :src="src" alt="" @click="photoZoom(src)">
                </el-tab-pane>
              </el-tabs>
            </el-row>

            <el-dialog v-model="dialogVisible" size="tiny">
              <img width="100%" height="100%" :src="src">
            </el-dialog>
          </el-col>
        </el-form>
      </el-row>
    </div>

    
  </div>
</template>

<script>
  import * as SITEURL from '@/store/app-urls'
  export default {
    name: 'user',
    data () {
      return {
        editorOption: {},
        realName: '',
        phoneNumber: '',
        form: {
          startTime: ''
        },
        timeShow: false,
        radioStatus: '1',
        src: '',
        radio: '',
        options: [{
          value: '两年',
          label: '两年'
        }, {
          value: '三年',
          label: '三年'
        }, {
          value: '四年',
          label: '四年'
        }, {
          value: '五年',
          label: '五年'
        }, {
          value: '六年',
          label: '六年'
        }, {
          value: '七年',
          label: '七年'
        }],
        periods: '',
        value: '',
        area: '',
        formatTime: '',
        pickerOptions0: {},
        userAmount_cash: '',
        student_subordinate_num: '',
        student_integral: '',
        marketing: [],
        submitBtnDis: false,
        dialogImageUrl: '',
        dialogVisible: false,
        activeName: 'first',
        loading: false,
        rules: {
          remark: [
            { required: true, message: '请输入驳回原因', trigger: 'blur' },
            { min: 1, message: '长度不少于1个字符', trigger: 'blur' }
          ]
        }
      }
    },
    created: function () {
      this.realName = this.$store.state.student.realName
      this.phoneNumber = this.$store.state.student.phoneNumber
      this.form.school = this.$store.state.student.school
      this.form.startTime = this.$store.state.student.startTime
      this.radio = this.$store.state.student.degree
      this.degreeCheck(this.radio)
      this.form.studentNumber = this.$store.state.student.studentNumber
      this.src = this.$store.state.student.studentIdCard
      this.form.id = this.$store.state.student.id
      this.student_subordinate_num = this.$store.state.student.student_subordinate_num
      this.student_integral = this.$store.state.student.student_integral
      this.userAmount_cash = this.$store.state.student.userAmount_cash
      this.periods = this.$store.state.student.period
      this.form.initIntegral = this.$store.state.student.userAmount_integral
    },
    methods: {
      // 渲染学历类型
      degreeCheck (role) {
        if (role === '本科') {
          this.radio = '2'
        } else if (role === '专科') {
          this.radio = '1'
        } else {
          this.radio = '3'
        }
      },
      onSubmit (formName) {
        if (this.radio === '1') {
          this.radiotext = '0'
        } else if (this.radio === '2') {
          this.radiotext = '1'
        } else {
          this.radiotext = '2'
        }
        // 往form表格里赋值
        this.form.period = this.periodTime(this.periods)
        this.form.degree = this.radiotext
        this.form.remark = this.radioStatus === '1' ? '' : this.form.remark
        this.form.auditStatus = this.radioStatus
        // 表单验证
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.loading = true
            this.$axios.post(SITEURL.SET_STUDENTINFO, this.form).then(response => {
              this.loading = false
              if (response.data.data === true) {
                this.$message.success(response.data.message)
              } else {
                this.$message.error('操作失败，' + response.data.message)
              }
              this.$router.go(-1)
            }).catch(error => {
              this.loading = false
              this.submitBtnDis = false
              this.$message.error('服务器出错，' + error)
              this.$router.go(-1)
            })
          } else {
            this.loading = false
            console.log('error submit!!')
            this.submitBtnDis = false
          }
        })
      },
      onCancel () {
        this.$router.go(-1)
      },
      dateChange (val) {
        this.form.startTime = val
      },
      photoZoom (url) {
        this.dialogVisible = true
      },
      // 处理默认学制
      periodTime (time) {
        if (time === '两年') {
          time = '0'
        } else if (time === '三年') {
          time = '1'
        } else if (time === '四年') {
          time = '2'
        } else if (time === '五年') {
          time = '3'
        } else if (time === '六年') {
          time = '4'
        } else {
          time = '5'
        }
        return time
      }
    }
  }
</script>

<style scoped>
  .merchantedit {
    display: block;
    /*width: 45%;*/
    border: 1px solid #eaeefb;
    border-radius: 4px;
    transition: .2s;
    padding: 24px;
    height: 780px;
  }
  .merchantimg {
    padding-left: 50px;
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }
  .merchantimg .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .upload-title {
    margin-top: 15px;
    margin-bottom: 20px;
  }
  .inline-input {
    width: 100%;
  }
  .bm-view {
    width: 100%;
    height: 400px;
  }
  .input-num {
    width: 82px;
  }
  .slider {
    font-size: 14px;
    color: #8492a6;
    line-height: 44px;
  }
  .text{
    line-height:64px;
  }
  .merchantimg img{
    max-width:500px;
    max-height: 500px;
  }
  .idErrorText,.schoolErrorText{
    font-size:12px;
    color:#ff4949;
    height: 20px;
  }
  .studentIdwrap .el-form-item__content .el-input input{
    width:200px !important;
  } 
</style>
