<template>
  <div id="goodsClass" class="content">
    <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>商城管理</el-breadcrumb-item>
        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
        <el-breadcrumb-item>C2C商品分类</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="search">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item>
          <el-button type="primary" @click="addCategory" icon="caret-right">新增分类</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="userlist">
      <template>
        <el-table :data="tableData" stripe border style="width: 100%" height="750" type="selection" v-loading="loading">
          <el-table-column prop="categoryName" label="分类名称"></el-table-column>
          <el-table-column prop="introduction" label="分类介绍"></el-table-column>
          <el-table-column prop="sortShow" label="排序号"></el-table-column>
          <el-table-column prop="show" label="是否展示">
            <template scope="scope">
              <el-switch on-color="#13ce66" off-color="#f7ba2a" on-text="是" off-text="否" v-model="scope.row.show" @change="handleShow(scope.$index, scope.row)"></el-switch>
            </template>
          </el-table-column>
          <el-table-column prop="image" label="分类图">
            <template scope="scope">
              <img  v-lazy="scope.row.image" class="cover-img" @click="handlePictureCardPreview" />
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

    <el-dialog title="商家分类修改" v-model="dialogFormVisible">
      <el-form :model="form" ref="mcategoryForm" :rules="rules" class="category-edit" v-loading="editLoading">
        <el-form-item label="分类名称" :label-width="formLabelWidth" prop="categoryName">
          <el-input v-model="form.categoryName" placeholder="请填写分类名称"></el-input>
        </el-form-item>
        <el-form-item label="分类介绍" :label-width="formLabelWidth">
          <el-input v-model="form.introduction" placeholder="请填写分类介绍"></el-input>
        </el-form-item>
        <el-form-item label="排序号" :label-width="formLabelWidth">
          <el-input-number v-model="form.sortShow" :min="0"></el-input-number>
        </el-form-item>
        <el-form-item label="分类图片" :label-width="formLabelWidth">
          <el-upload
            class="avatar-uploader"
            ref="upload"
            list-type="picture-card"
            :action="iconImageUrl"
            :data="{fileType: form.class}"
            :file-list="[{url: form.image}]"
            :on-success="handleUploadSuccess"
            :on-remove="handleRemoveCover"
            :before-upload="beforeImageUpload">            
            <i class="el-icon-plus"></i>
          </el-upload>
          <input type="hidden" name="fileType" value="category"> 
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" icon="circle-check" @click="onSubmit('mcategoryForm')" style="width: 150px;">提 交</el-button>
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
          class: 'category',
          categoryName: '',
          introduction: '',
          sortShow: 0,
          image: '',
          id: ''
        },
        tableData: [],
        tableDataIndex: 0,
        loading: true,
        editLoading: false,
        iconImageUrl: SITEURL.GOODS_UPLOAD,
        dialogImageUrl: '',
        dialogVisible: false,
        dialogFormVisible: false,
        formLabelWidth: '100px',
        headers: { Authorization: 'Bearer {' + this.$store.state.token + '}' },
        rules: {
          categoryName: [
            { required: true, message: '请输入分类名称', trigger: 'blur' },
            { min: 2, max: 4, message: '长度在1到4个字符', trigger: 'blur' }
          ]
        }

      }
    },
    created: function () {
      this.getList()
    },
    methods: {
      getList () {
        this.$axios.get(SITEURL.GET_GOODSCLASS).then(response => {
          this.loading = false
          if (response.data.status.succeed === '1') {
            this.tableData = response.data.data
          } else {
            this.$message.error('操作失败，' + response.data.status.errorDesc)
          }
        }, response => {
          // error callback
        })
      },
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
        let myJson = {
          id: this.form.id,
          categoryName: this.form.categoryName,
          image: this.imgurl,
          introduction: this.form.introduction,
          sortShow: this.form.sortShow
        }
        let json = JSON.stringify(myJson)
        let stringJsons = encodeURIComponent(json)
        this.$refs[formName].validate((valid) => {
          const that = this
          that.editLoading = true
          if (valid) {
            that.$axios.post(SITEURL.MODIFY_GOODSCLASS + '?json=' + stringJsons).then(response => {
              that.editLoading = false
              if (response.data.status.succeed === '1') {
                this.$message.success('修改信息成功')
                this.getList()
              } else {
                this.$message.error('操作失败')
              }
              that.dialogFormVisible = false
            }, response => {
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      addCategory () {
        this.$router.push({ path: '/mallmanagement/goods/class/create' })
      },
      // 点击编辑的时候，获取每一列的信息
      handleEdit (index, row) {
        this.tableDataIndex = index
        this.form.categoryName = row.categoryName
        this.form.introduction = row.introduction
        this.form.sortShow = row.sortShow
        this.form.image = row.image
        this.form.id = row.id
        this.state = row.show
        this.dialogFormVisible = true
      },
      // 切换显示隐藏
      handleShow (index, row) {
        // console.log(row)
        let myJson = {
          id: row.id,
          isShow: row.show
        }
        let json = JSON.stringify(myJson)
        let stringJsons = encodeURIComponent(json)
        this.$axios.post(SITEURL.MODIFY_GOODSCLASS + '?json=' + stringJsons).then(response => {
          console.log(response)
          if (response.data.status.succeed === '1') {
            this.$message.success('操作成功')
          } else {
            this.$message.error('操作失败，' + response.data.status.errorDesc)
            // 如果操作失败了,那么将视图状态变回来
            if (row.show === true) {
              row.show = false
            } else {
              row.show = true
            }
          }
        }).catch(error => {
          console.log(error)
        })
      },
      handlePictureCardPreview (event) {
        this.dialogImageUrl = event.target.src
        this.dialogVisible = true
      },
      handleRemoveCover (file, fileList) {
        console.log(file, fileList)
      },
      handleUploadSuccess (response, file, fileList) {
        // 如果上传了多张。则保留最后一张
        if (fileList.length > 1) {
          fileList.splice(0, 1)
        }
        if (response.message.type === 'success') {
          this.$message.success('图片上传成功')
          this.imgurl = file.response.url
        } else {
          this.$message.error('操作失败')
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
  .userlist {
    padding-top: 20px;
  }

  .cover-img {
    padding-top: 8px;
    width: 60px;
    height: 48px;
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
