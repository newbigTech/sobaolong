<template>
  <div id="tag" class="content">
    <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>系统管理</el-breadcrumb-item>
        <el-breadcrumb-item>APP设置</el-breadcrumb-item>
        <el-breadcrumb-item>标签管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="search">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item>
          <el-button type="primary" @click="addTag" icon="caret-right">新增标签</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="tag-list">
      <template>
        <el-table :data="tableData" stripe border style="width: 100%" height="750" type="selection" v-loading="loading">
          <el-table-column prop="sortShow" label="排序号"></el-table-column>
          <el-table-column prop="name" label="标签名称"></el-table-column>
          <el-table-column prop="tagImg" label="标签图片">
            <template scope="scope">
              <img :src="scope.row.tagImg" class="cover-img" @click="handlePictureCardPreview" />
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template scope="scope">
              <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>
    <el-dialog v-model="dialogVisible" size="tiny">
      <img width="100%" height="100%" :src="dialogImageUrl" alt="">
    </el-dialog>

    <el-dialog title="标签修改" v-model="dialogFormVisible" @close="closeEditDialog">
      <el-form :model="form" ref="tagForm" :rules="rules" class="category-edit" v-loading="editLoading">
        <el-form-item label="标签名称" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name" placeholder="请填写标签名称"></el-input>
        </el-form-item>
        <el-form-item label="排序号" :label-width="formLabelWidth">
          <el-input-number v-model="form.sortShow" :min="0"></el-input-number>
        </el-form-item>
        <el-form-item label="标签图片" :label-width="formLabelWidth">
          <el-upload
            class="avatar-uploader"
            ref="upload"
            list-type="picture-card"
            :headers="headers"
            :action="tagImgUrl"
            :data="{id: form.id}"
            :file-list="[{url: form.tagImg}]"
            :on-success="handleUploadSuccess"
            :on-remove="handleRemoveCover"
            :before-upload="beforeImageUpload">
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" icon="circle-check" @click="onSubmit('tagForm')" style="width: 150px;">提 交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import * as SITEURL from '@/store/app-urls'
  export default {
    name: 'user',
    data () {
      return {
        form: {
          id: 0,
          name: '',
          sortShow: 0,
          tagImg: ''
        },
        tableData: [],
        tableDataIndex: 0,
        loading: true,
        editLoading: false,
        tagImgUrl: SITEURL.TAG_IMAGE_UPLOAD_URL,
        dialogImageUrl: '',
        dialogVisible: false,
        dialogFormVisible: false,
        formLabelWidth: '100px',
        headers: { Authorization: 'Bearer {' + this.$store.state.token + '}' },
        rules: {
          name: [
            { required: true, message: '请输入标签名称', trigger: 'blur' },
            { min: 2, message: '长度在2个字符以上', trigger: 'blur' }
          ]
        }
      }
    },
    created: function () {
      // GET /someUrl
      this.$axios.get(SITEURL.TAG_LIST_URL).then(response => {
        // get body data
        this.loading = false
        this.tableData = response.data.data
      }).catch(error => {
        console.log(error)
      })
    },
    methods: {
      onSubmit (formName) {
        // 表单验证
        if (!this.$refs.upload.uploadFiles.length) {
          this.$message({
            showClose: true,
            type: 'warning',
            message: '请上传分类图！'
          })
          return
        }
        this.$refs[formName].validate((valid) => {
          const that = this
          that.editLoading = true
          if (valid) {
            that.$axios.post(SITEURL.TAG_EDIT_URL, that.form).then(response => {
              that.editLoading = false
              if (response.data.success) {
                this.$message.success('操作成功，' + response.data.message)
                that.tableData[that.tableDataIndex].id = response.data.data.id
                that.tableData[that.tableDataIndex].name = response.data.data.name
                that.tableData[that.tableDataIndex].sortShow = response.data.data.sortShow
                that.tableData[that.tableDataIndex].tagImg = response.data.data.tagImg
              } else {
                this.$message.error('操作失败，' + response.data.message)
              }
              that.dialogFormVisible = false
            }).catch(error => {
              console.log(error)
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      addTag () {
        this.$router.push({ path: '/setting/tag/create' })
      },
      handleSelectionChange (val) {
        this.multipleSelection = val
      },
      handleEdit (index, row) {
        this.tableDataIndex = index
        this.form.id = row.id
        this.form.name = row.name
        this.form.sortShow = row.sortShow
        this.form.tagImg = row.tagImg
        this.dialogFormVisible = true
      },
      handlePictureCardPreview (event) {
        this.dialogImageUrl = event.target.src
        this.dialogVisible = true
      },
      handleRemoveCover (file, fileList) {
        this.$axios.post(SITEURL.TAG_IMAGE_DELETE_URL, {id: this.form.id}).then(response => {
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
        if (fileList.length > 1) {
          fileList.splice(0, 1)
        }
        if (response.success) {
          this.$message.success('操作成功，' + response.message)
          fileList = [{url: response.data.tagImg}]
          this.form.id = response.data.id
          this.form.tagImg = response.data.tagImg
        } else {
          this.$message.error('操作失败，' + response.message)
        }
      },
      beforeImageUpload (file) {
        const isJPG = file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png'
        const isLt2M = file.size / 1024 / 1024 < 2

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!')
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!')
        }
        return isJPG && isLt2M
      },
      closeEditDialog () {
        this.form = {
          name: '',
          sortShow: '',
          tagImg: ''
        }
      }
    }
  }
</script>

<style scoped>
  .el-form-item {
    margin-bottom: 0 !important;
  }
  .breadcrumb {
    margin: 20px 0 20px 0;
  }
  .search {
    padding: 10px 20px 10px 20px;
    background: #d3dce6;
  }
  .tag-list {
    padding-top: 20px;
  }

  .cover-img {
    padding-top: 8px;
    width: 100px;
    height: 60px;
  }

  .category-edit {
    display: block;
    /*width: 45%;*/
    border: 1px solid #eaeefb;
    border-radius: 4px;
    transition: .2s;
    padding: 24px;
  }

  .category-edit .el-form-item {
    margin: 20px
  }

  .dialog-footer {
    text-align: center;
  }
</style>
