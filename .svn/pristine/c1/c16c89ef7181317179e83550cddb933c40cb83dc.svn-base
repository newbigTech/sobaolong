<template>
  <div id="advertise-create" class="content">
    <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>资讯与广告</el-breadcrumb-item>
        <el-breadcrumb-item>广告管理</el-breadcrumb-item>
        <el-breadcrumb-item>修改广告</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="adv-edit" v-loading="loading">
      <el-row>
        <el-form ref="advForm" :model="form" :rules="rules" label-width="100px">
          <el-col :span="10" class="merchantinfo">
            <el-form-item label="广告标题" prop="title">
              <el-input v-model="form.title" placeholder="请填写广告标题"></el-input>
            </el-form-item>
            <el-form-item label="所属地区">
              <el-autocomplete class="inline-input" v-model="area" :fetch-suggestions="querySearch"
                               placeholder="请填写所属地区，不填则为平台广告" :trigger-on-focus="false" @select="handleSelect">
              </el-autocomplete>
            </el-form-item>
            <el-form-item label="商家名称">
              <el-autocomplete class="inline-input" v-model="merchant" :fetch-suggestions="merchantSearch"
                               placeholder="请填写店铺名称，不填则为平台广告" :trigger-on-focus="false" @select="handleMerchantSelect">
              </el-autocomplete>
            </el-form-item>
            <el-row>
              <el-col :span="12">
                <el-form-item label="广告类型">
                  <el-select v-model="form.adType" placeholder="请选择">
                    <el-option v-for="item in adTypeOptions" :label="item.label" :value="item.value" :key="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="发布位置">
                  <el-select v-model="form.adLocation" placeholder="请选择">
                    <el-option v-for="item in adLocationOptions" :label="item.label" :value="item.value" :key="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="起始时间">
              <el-date-picker v-model="form.beginDate" align="right" type="datetime" placeholder="选择起始时间" :picker-options="pickerOptions"></el-date-picker>
            </el-form-item>
            <el-form-item label="结束时间">
              <el-date-picker v-model="form.endDate" align="right" type="datetime" placeholder="选择结束时间" :picker-options="pickerOptions"></el-date-picker>
            </el-form-item>
            <el-row>
              <el-col :span="14">
                <el-form-item label="排序号">
                  <el-input-number v-model="form.sortShow" :min="0"></el-input-number>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="广告状态">
                  <el-select v-model="form.adStatus" placeholder="请选择">
                    <el-option v-for="item in adStatusOptions" :label="item.label" :value="item.value" :key="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="封面图" :required="true">
              <el-upload
                class="avatar-uploader"
                ref="upload"
                list-type="picture"
                :headers="headers"
                :data="{id: form.id}"
                :file-list="[{url: form.image}]"
                :action="coverImageUrl"
                :on-preview="handlePicturePreview"
                :on-success="handleUploadSuccess"
                :on-remove="handleRemoveCover"
                :before-upload="beforeCoverUpload">
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过1M。封面图只能上传1张。</div>
              </el-upload>
              <el-dialog v-model="dialogVisible" size="tiny">
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog>
            </el-form-item>
          </el-col>
          <el-col :span="14" class="textEditor">
            <div class="quill-editor">
              <!-- quill-editor -->
              <quill-editor ref="myTextEditor" v-model="form.content" :options="editorOption"></quill-editor>
            </div>
          </el-col>
        </el-form>
      </el-row>
    </div>
    <div class="submit-btn">
      <el-button @click="onCancel">返回</el-button>
      <el-button type="info" icon="circle-check" @click="onSubmit('advForm')" :disabled="submitBtnDis" style="width: 150px;">提 交</el-button>
    </div>
    <el-dialog v-model="dialogVisible" size="tiny">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
  import * as SITEURL from '@/store/app-urls'
  export default {
    name: 'advertisement',
    data () {
      return {
        editorOption: {},
        coverImageUrl: SITEURL.ADV_IMAGE_UPLOAD_URL,
        form: {
          adType: 1,
          adLocation: 0,
          adStatus: 0,
          sortShow: 0,
          beginDate: '',
          endDate: ''
        },
        area: '',
        merchant: '',
        adStatus: '',
        submitBtnDis: false,
        tableData: [],
        queryString: '',
        adTypeOptions: this.$store.state.adTypes,
        adStatusOptions: this.$store.state.adStatus,
        adLocationOptions: this.$store.state.adLocations,
        dialogFormVisible: false,
        dialogVisible: false,
        dialogImageUrl: '',
        loading: false,
        headers: { Authorization: 'Bearer {' + this.$store.state.token + '}' },
        pickerOptions: {
          shortcuts: [{
            text: '今天',
            onClick (picker) {
              picker.$emit('pick', new Date())
            }
          }, {
            text: '昨天',
            onClick (picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24)
              picker.$emit('pick', date)
            }
          }, {
            text: '一周前',
            onClick (picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', date)
            }
          }]
        },
        rules: {
          title: [
            { required: true, message: '请输入标题', trigger: 'blur' },
            { min: 3, message: '长度在3个字符以上', trigger: 'blur' }
          ],
          beginDate: [
            { type: 'date', required: true, message: '请选择起始时间', trigger: 'change' }
          ],
          endDate: [
            { type: 'date', required: true, message: '请选择结束时间', trigger: 'change' }
          ]
        }
      }
    },
    computed: {
      editor () {
        return this.$refs.myTextEditor.quillEditor
      }
    },
    created: function () {
      // 获取存储在vuex里的商家数据
      this.form = this.$store.state.advertise
      this.area = this.form.fullName
      this.merchant = this.form.companyName
    },
    methods: {
      onEditorChange (editor) {
        console.log('editor blur!', editor)
      },
      onSubmit (formName) {
        this.submitBtnDis = true
        // 表单验证
        if (!this.$refs.upload.uploadFiles.length) {
          this.$message({
            showClose: true,
            type: 'warning',
            message: '请选择封面图！'
          })
          this.submitBtnDis = false
          return
        }
        this.$refs[formName].validate((valid) => {
          const that = this
          if (valid) {
            that.loading = true
            that.$axios.post(SITEURL.ADV_EDIT_URL, this.form).then(response => {
              that.loading = false
              if (response.data.success) {
                this.$message.success('操作成功，' + response.data.message)
                that.$router.push({ path: '/inform/advertise/list' })
              } else {
                this.$message.error('操作失败，' + response.data.message)
              }
            }).catch(error => {
              console.log(error)
            })
          } else {
            that.loading = false
            console.log('error submit!!')
            return false
          }
        })
      },
      onCancel () {
        this.$router.go(-1)
      },
      querySearch (queryString, cb) {
        var results = []
        if (/^[\u4e00-\u9fa5]+$/.test(queryString) && queryString.length >= 3) {
          this.$axios.get(SITEURL.AUTOCOMPLETE_AREA + '?text=' + queryString).then(response => {
            results = response.data.data
            // 调用 callback 返回建议列表的数据
            cb(results)
          }).catch(error => {
            console.log(error)
          })
        } else {
          cb(results)
        }
      },
      handleSelect (item) {
        this.form.area = item.id
      },
      merchantSearch (queryString, cb) {
        var results = []
        if (/^[\u4e00-\u9fa5]+$/.test(queryString) && queryString.length >= 2) {
          this.$axios.get(SITEURL.AUTOCOMPLETE_MERCHANT + '?text=' + queryString).then(response => {
            results = response.data.data
            // 调用 callback 返回建议列表的数据
            cb(results)
          }).catch(error => {
            console.log(error)
          })
        } else {
          cb(results)
        }
      },
      handleMerchantSelect (item) {
        this.form.merchantId = item.id
      },
      // 图片上传
      beforeCoverUpload (file) {
        const isJPG = file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png'
        const isLt2M = file.size / 1024 / 1024 < 1

        if (!isJPG) {
          this.$notify.error({title: '错误', message: '上传图片只能是 JPG 和 PNG格式!'})
        }
        if (!isLt2M) {
          this.$notify.error({title: '错误', message: '上传图片大小不能超过 1MB!'})
        }
        return isJPG && isLt2M
      },
      handlePicturePreview (file) {
        this.dialogImageUrl = file.url
        this.dialogVisible = true
      },
      handleRemoveCover (file, fileList) {
        this.$axios.post(SITEURL.ADV_IMAGE_DELETE_URL, {id: this.form.id}).then(response => {
          if (response.data.success) {
            this.$message.success('操作成功，' + response.data.message)
          } else {
            this.$message.error('操作失败，' + response.data.message)
          }
        }).catch(error => {
          console.log(error)
        })
      },
      handleUploadSuccess (response, file, fileList) {
        if (response.success) {
          this.$message.success('操作成功，' + response.message)
          fileList = [{url: response.data.image}]
          this.form.id = response.data.id
          this.form.image = response.data.image
        } else {
          this.$message.error('操作失败，' + response.message)
          fileList = []
        }
        this.submitBtnDis = false
      }
    }
  }
</script>

<style scoped>
  .breadcrumb {
    margin: 20px 0 20px 0;
  }
  .ql-container .ql-editor {
    min-height: 20em;
    padding-bottom: 1em;
    max-height: 25em;
  }
  .quill-editor {
    height: 530px;
  }
  .adv-edit {
    display: block;
    /*width: 45%;*/
    border: 1px solid #eaeefb;
    border-radius: 4px;
    transition: .2s;
    padding: 24px;
    min-height: 610px;
    height: auto;
  }
  .textEditor {
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
  .adimg .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .inline-input {
    width: 100%;
  }
  .submit-btn {
    margin-top: 20px;
  }
</style>
