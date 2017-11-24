<template>
  <div id="studentEdit" class="content">
    <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>学生计划</el-breadcrumb-item>
        <el-breadcrumb-item>待审核大学生</el-breadcrumb-item>
        <el-breadcrumb-item>编辑</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="merchantedit" v-loading="loading">
      <el-row>
        <el-form ref="studentForm" :model="form"  label-width="100px">
          <el-col :span="12" class="merchantinfo">
            <el-row>
              <el-col :span="8">
                <el-form-item label="姓名">
                  <el-input v-model="form.realName" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10">
                <el-form-item label="手机号">
                    <el-input v-model="form.phoneNumber" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="15">
                <el-form-item label="学校名称" prop="schoolName">
                  <el-input v-model="form.schoolName" placeholder="请填写学校名称"  @blur="schoolNameBlur"></el-input>
                  <p v-if="schoolErrorStatus" class="schoolErrorText">{{schoolError}}</p>
                </el-form-item>
              </el-col>
            </el-row>
            
              <el-form-item label="入学日期" :required="true">
                <div>
                  <el-date-picker  v-model="form.startTime" type="date"  placeholder="选择日期"  :picker-options="pickerOptions0" @change="dateChange">
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
                  
                  <el-select  v-model="form.period" placeholder="请修改学制">
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
                  <el-input v-model="form.studentId" @blur="studentIdBlur"></el-input>
                  <p v-if="idErrorStatus" class="idErrorText">{{idError}}</p>
                </el-form-item>
               
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="可兑换积分"  class="studentIdwrap">
                  <el-input v-model="form.student_integral" :disabled="true"></el-input>
                </el-form-item>
               
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="现金金额"  class="studentIdwrap">
                  <el-input v-model="form.userAmount_cash" :disabled="true"></el-input>
                </el-form-item>
               
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="积分余额"  class="studentIdwrap">
                  <el-input v-model="form.userAmount_integral" :disabled="true"></el-input>
                </el-form-item>
               
              </el-col>
            </el-row>

             <el-row>
              <el-col :span="12">
                <el-form-item label="下级人数"  class="studentIdwrap">
                  <el-input v-model="form.student_subordinate_num"  :disabled="true"></el-input>
                </el-form-item>
               
              </el-col>
            </el-row>

            <el-form-item label="审核状态" :required="true">
               <el-radio class="radio" v-model="radioStatus" label="1">通过</el-radio>
               <el-radio class="radio" v-model="radioStatus" label="2">驳回</el-radio>
              <!-- <el-switch on-color="#13ce66" off-color="#f7ba2a" on-text="是" off-text="否" :on-value="1" :off-value="2" v-model="form.Status"></el-switch> -->
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
        form: {
          realName: '',
          phoneNumber: '',
          schoolName: '',
          startTime: '',
          studentId: '',
          merchantStatus: '1',
          Status: true,
          period: ''
        },
        timeShow: false,
        radioStatus: '1',
        src: '',
        radio: '',
        options: [{
          value: '0',
          label: '两年'
        }, {
          value: '1',
          label: '三年'
        }, {
          value: '2',
          label: '四年'
        }, {
          value: '3',
          label: '五年'
        }, {
          value: '4',
          label: '六年'
        }, {
          value: '5',
          label: '七年'
        }],
        value: '',
        area: '',
        marketing: [],
        submitBtnDis: false,
        dialogImageUrl: '',
        dialogVisible: false,
        activeName: 'first',
        loading: false,
        pickerOptions0: {
        },
        idError: '',
        idErrorStatus: false,
        startTime: '',
        schoolError: '',
        schoolErrorStatus: false
      }
    },
    created: function () {
      this.form.realName = this.$store.state.student.realName
      this.form.phoneNumber = this.$store.state.student.phoneNumber
      this.form.schoolName = this.$store.state.student.school
      this.form.startTime = this.$store.state.student.startTime
      this.degree = this.$store.state.student.degree
      this.degreeCheck(this.degree)
      this.form.studentId = this.$store.state.student.studentNumber
      this.src = this.$store.state.student.studentIdCard
      this.id = this.$store.state.student.id
      this.form.student_subordinate_num = this.$store.state.student.student_subordinate_num
      this.form.student_integral = this.$store.state.student.student_integral
      this.form.userAmount_cash = this.$store.state.student.userAmount_cash
      this.form.period = this.$store.state.student.period
      this.form.userAmount_integral = this.$store.state.student.userAmount_integral
      this.initIntegral = this.$store.state.student.userAmount_integral
    },
    methods: {
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
        // console.log(this.radioStatus)
        if (this.radio === '1') {
          this.radiotext = '0'
        } else if (this.radio === '2') {
          this.radiotext = '1'
        } else {
          this.radiotext = '2'
        }
        if (this.formatTime === undefined) {
          this.formatTime = this.form.startTime
        }
        // 表单验证
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.loading = true
            this.$axios.post(SITEURL.SET_STUDENTINFO + '?id=' + this.id + '&school=' + this.form.schoolName + '&startTime=' + this.formatTime + '&degree=' + this.radiotext + '&period=' + this.form.period + '&studentNumber=' + this.form.studentId + '&auditStatus=' + this.radioStatus + '&initIntegral=' + this.initIntegral).then(response => {
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
        this.formatTime = val
      },
      // 学号 验证
      studentIdBlur () {
        this.studentId = this.form.studentId.trim()
        const reg = /^[0-9]*$/
        if (!reg.test(this.studentId)) {
          this.idErrorStatus = true
          this.idError = '请输入正确的学号'
        } else {
          this.idErrorStatus = false
        }
      },
      // 学校名称验证
      schoolNameBlur () {
        this.schoolName = this.form.schoolName.trim()
        const reg = /[\u4e00-\u9fa5]{4}/g
        if (!reg.test(this.schoolName)) {
          this.schoolErrorStatus = true
          this.schoolError = '请输入正确的学校名称'
        } else {
          this.schoolErrorStatus = false
        }
      },
      photoZoom (url) {
        this.dialogVisible = true
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
    height: 840px;
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
