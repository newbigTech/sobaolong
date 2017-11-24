<template>
  <div id="advertise-create" class="content">
    <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>资讯与广告</el-breadcrumb-item>
        <el-breadcrumb-item>资讯管理</el-breadcrumb-item>
        <el-breadcrumb-item>新建资讯</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="news-create" v-loading="loading">
      <el-row>
        <el-form ref="newsForm" :model="form" :rules="rules" label-width="100px">
          <el-col :span="10">
            <el-form-item label="资讯标题" prop="title">
              <el-input v-model="form.title" placeholder="请填写资讯标题"></el-input>
            </el-form-item>
            <el-form-item label="所属地区" :required="true">
              <el-autocomplete class="inline-input" v-model="city" :fetch-suggestions="querySearch"
                               placeholder="请填写所属区域，不填则为平台资讯" :trigger-on-focus="false" @select="handleSelect">
              </el-autocomplete>
            </el-form-item>
            <el-form-item label="排序号">
              <el-input-number v-model="form.sortShow" :min="0"></el-input-number>
            </el-form-item>
            <el-form-item label="立即发布">
              <el-switch on-color="#13ce66" off-color="#f7ba2a" on-text="是" off-text="否" v-model="isShow"></el-switch>
            </el-form-item>
            <el-form-item label="封面图" :required="true">
              <el-upload
                class="avatar-uploader"
                ref="upload"
                list-type="picture"
                :headers="headers"
                :data="imageData"
                :file-list="fileList"
                :action="coverImageUrl"
                :on-preview="handlePicturePreview"
                :on-success="handleUploadSuccess"
                :on-remove="handleRemoveCover"
                :auto-upload="false"
                :before-upload="beforeImageUpload">
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
      <el-button type="info" icon="circle-check" @click="onSubmit('newsForm')" style="width: 150px;">提 交</el-button>
    </div>
    <el-dialog v-model="dialogVisible" size="tiny">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
  import * as SITEURL from '@/store/app-urls'
  export default {
    name: 'inform-news',
    data () {
      return {
        editorOption: {},
        coverImageUrl: SITEURL.NEWS_IMAGE_UPLOAD_URL,
        form: {sortShow: 0},
        isShow: true,
        city: '',
        tableData: [],
        fileList: [],
        imageData: {},
        queryString: '',
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
          ]
        }
      }
    },
    computed: {
      editor () {
        return this.$refs.myTextEditor.quillEditor
      }
    },
    methods: {
      onEditorChange (editor) {
        console.log('editor blur!', editor)
      },
      onSubmit (formName) {
        // 表单验证
        if (!this.$refs.upload.uploadFiles.length) {
          this.$message({
            showClose: true,
            type: 'warning',
            message: '请选择封面图！'
          })
          return
        } else if (!this.form.content) {
          this.$message({
            showClose: true,
            type: 'warning',
            message: '请填写资讯内容！'
          })
          return
        }
        this.$refs[formName].validate((valid) => {
          const that = this
          if (valid) {
            that.form.isShow = that.isShow ? 1 : 0
            that.loading = true
            that.$axios.post(SITEURL.NEWS_CREATE_URL, that.form).then(response => {
              that.loading = false
              if (response.data.success) {
                this.$message.success('操作成功，' + response.data.message)
                that.imageData.id = response.data.data.id
                if (that.$refs.upload.uploadFiles.length > 1) {
                  that.$refs.upload.uploadFiles.splice(0, that.$refs.upload.uploadFiles.length - 1)
                }
                that.$refs.upload.submit()
              } else {
                this.$message.error('操作失败，' + response.data.message)
              }
            }).catch(error => {
              that.loading = false
              console.log(error)
            })
          } else {
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
          this.$axios.get(SITEURL.NEWS_SEARCH_RECOMMEND_URL + '?text=' + queryString).then(response => {
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
        this.form.area_id = item.id
      },
      // 图片上传
      beforeImageUpload (file) {
        const isJPG = file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png'
        const isLt2M = file.size / 1024 / 1024 < 1

        if (!isJPG) {
          this.$message.error('上传图片只能是 JPG 和 PNG格式!')
        }
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 1MB!')
        }
        return isJPG && isLt2M
      },
      handlePicturePreview (file) {
        this.dialogImageUrl = file.url
        this.dialogVisible = true
      },
      handleRemoveCover (file, fileList) {
        this.$axios.post(SITEURL.NEWS_IMAGE_DELETE_URL, {id: this.form.id}).then(response => {
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
          this.$router.push({ path: '/inform/news/list' })
        } else {
          this.$message.error('操作失败，' + response.message)
        }
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
    height: 400px;
  }
  .news-create {
    display: block;
    /*width: 45%;*/
    border: 1px solid #eaeefb;
    border-radius: 4px;
    transition: .2s;
    padding: 24px;
    min-height: 510px;
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
