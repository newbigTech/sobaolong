<template>
  <div id="user" class="content">
    <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>商家管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户信息</el-breadcrumb-item>
        <el-breadcrumb-item>商家信息修改</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="merchantedit" v-loading="loading">
      <el-row>
        <el-form ref="merchantForm" :model="form" :rules="rules" label-width="100px">
          <el-col :span="12" class="merchantinfo">
            <el-row>
              <el-col :span="12">
                <el-form-item label="用户昵称">
                  <el-input v-model="form.username" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="真实姓名">
                  <el-input v-model="form.realName" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="注册账号">
                  <el-input v-model="form.mobile" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="公司名称" prop="companyName">
              <el-input v-model="form.companyName" placeholder="请填写公司或店铺名称"></el-input>
            </el-form-item>
            <el-form-item label="所属地区" :required="true">
              <el-autocomplete class="inline-input" v-model="area" :fetch-suggestions="queryAreaSearch"
                               placeholder="请选择所属地区" :trigger-on-focus="false" @select="handleAreaSelect">
              </el-autocomplete>
            </el-form-item>
            <el-row>
              <el-col :span="20">
                <el-form-item label="公司地址" prop="addr">
                  <el-autocomplete class="inline-input" v-model="form.addr" :fetch-suggestions="queryAddress" icon="search" :on-icon-click="handleMapClick"
                                   placeholder="请填写公司地址" :trigger-on-focus="false" @select="handleSelect">

                  </el-autocomplete>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-button type="info" @click="showMap" style="margin-left: 28px;">地 图</el-button>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="经度">
                  <el-input v-model="form.longitude"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="纬度">
                  <el-input v-model="form.latitude"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="商家分类">
                  <el-select v-model="form.category" placeholder="请选择" @change="changeCategory">
                    <el-option v-for="item in categoryOptions" :label="item.label" :value="item.value" :key="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="商家标签">
                  <el-select v-model="form.tag" placeholder="请选择" @change="changeTag">
                    <el-option v-for="item in tagOptions" :label="item.label" :value="item.value" :key="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="联系人" prop="contacts">
                  <el-input v-model="form.contacts"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="联系电话" prop="phoneNumber">
                  <el-input v-model="form.phoneNumber"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-form-item label="营业时间" prop="businessHours">
              <el-input v-model="form.businessHours" placeholder="如：9:00~23:00"></el-input>
            </el-form-item>
            <el-form-item label="人均消费" prop="price">
              <el-input v-model="form.price" placeholder="0.00"></el-input>
            </el-form-item>
            <el-row>
              <el-col :span="12">
                <el-form-item label="浏览次数">
                  <el-input-number v-model="form.browseNumber" placeholder="设定浏览次数" size="small" :controls="false" class="input-num"></el-input-number>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="商家星级">
                  <el-input-number v-model="form.hotelRating" placeholder="设定商家星级" size="small" :controls="false" :min="0" :max="5" class="input-num"></el-input-number>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="首页推荐">
              <el-checkbox v-model="form.isRecommend">推荐</el-checkbox>
            </el-form-item>
            <el-form-item label="商圈名" prop="remark">
              <el-input v-model="form.remark" placeholder="如：春熙路"></el-input>
            </el-form-item>
            <el-form-item label="商家介绍" prop="introduction">
              <el-input type="textarea" :rows="4" placeholder="请填写商家介绍" v-model="form.introduction"></el-input>
            </el-form-item>
            <el-form-item label="是否上线">
              <el-switch on-color="#13ce66" off-color="#f7ba2a" on-text="是" off-text="否" :on-value="0" :off-value="1" v-model="form.merchantStatus"></el-switch>
            </el-form-item>
            <el-form-item style="margin-top: 20px">
              <el-button @click="onCancel">返回</el-button>
              <el-button type="info" icon="circle-check" @click="onSubmit('merchantForm')" :disabled="submitBtnDis" style="width: 150px;">提 交</el-button>
            </el-form-item>
          </el-col>

          <el-col :span="12" class="merchantimg">
            <el-row>
              <el-tabs v-model="activeName">
                <el-tab-pane label="商家封面图" name="first">
                  <el-upload
                    class="avatar-uploader"
                    ref="coverUpload"
                    list-type="picture-card"
                    :headers="headers"
                    :action="coverImageUrl"
                    :data="{id: form.id}"
                    :file-list="logoImg"
                    :on-preview="handlePictureCardPreview"
                    :on-success="handleUploadSuccess"
                    :on-remove="handleRemoveCover"
                    :before-upload="beforeCoverUpload">
                    <i class="el-icon-plus"></i>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过1M</div>
                  </el-upload>
                </el-tab-pane>
                <el-tab-pane label="商家介绍滚动图" name="second">
                  <el-upload
                    class=""
                    ref="sliderUpload"
                    list-type="picture"
                    :headers="headers"
                    :action="sliderImageUrl"
                    :data="{id: form.id}"
                    :file-list="sliderPic"
                    :on-preview="handlePictureCardPreview"
                    :on-success="handleUploadSliderSuccess"
                    :on-remove="handleRemoveSlider"
                    :before-upload="beforeCoverUpload">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过1M</div>
                  </el-upload>
                </el-tab-pane>
                <el-tab-pane label="商家详细介绍" name="third">
                  <!-- quill-editor -->
                  <quill-editor ref="myTextEditor" v-model="form.htmlIntroduction" :options="editorOption"></quill-editor>
                </el-tab-pane>
              </el-tabs>
            </el-row>

            <el-dialog v-model="dialogVisible" size="tiny">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </el-col>
        </el-form>
      </el-row>
    </div>

    <el-dialog title="商家地址定位" v-model="dialogMapVisible" @close="closeMapDialog">
      <div>
        <baidu-map class="bm-view" :center="center" :scroll-wheel-zoom="true" :zoom="mapZoom" @moving="syncCenter"
                   @moveend="syncCenter" @zoomend="syncZoom">
          <bm-marker :position="center" :dragging="true"
                     :label="{content: '拖拽标注地点', opts: {offset: {width: 20, height: -10}}}" @dragend="getMapPoint">
          </bm-marker>
          <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"/>
          <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"/>
          <bm-city-list anchor="BMAP_ANCHOR_TOP_LEFT"/>
        </baidu-map>
      </div>
      <div slot="footer" class="dialog-map-footer">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="经度">
            <el-input v-model.number="center.lng"></el-input>
          </el-form-item>
          <el-form-item label="纬度">
            <el-input v-model.number="center.lat"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="dialogMapVisible = false">取 消</el-button>
            <el-button type="primary" @click="setMapPoint">确 定</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import * as SITEURL from '@/store/app-urls'
  import { MERCHANT_INFO } from '@/store/mutation-types'
  export default {
    name: 'user',
    data () {
      return {
        editorOption: {},
        form: {
          addr: ''
        },
        area: '',
        marketing: [],
        uploadUrl: '',
        submitBtnDis: false,
        coverImageUrl: SITEURL.MERCHANT_WAIT_ONLINE_IMAGE_UPLOAD,
        sliderImageUrl: SITEURL.MERCHANT_WAIT_ONLINE_SLIDER_IMG,
        searchRecommends: [],
        logoImg: '',
        sliderPic: [],
        categoryOptions: [],
        tagOptions: [],
        dialogImageUrl: '',
        dialogVisible: false,
        dialogMapVisible: false,
        activeName: 'first',
        uploadData: {},
        isDelImg: true,
        loading: false,
        headers: { Authorization: 'Bearer {' + this.$store.state.token + '}' },
        // 地图
        center: {lng: 104.089305, lat: 30.571226},
        mapZoom: 5,
        rules: {
          companyName: [
            { required: true, message: '请输入公司或店铺名称', trigger: 'blur' },
            { min: 3, message: '长度在3个字符以上', trigger: 'blur' }
          ],
          addr: [
            { required: true, message: '请输入公司地址', trigger: 'blur' }
          ],
          price: [
            { required: true, message: '请输入均消费额', trigger: 'blur' }
          ],
          businessHours: [
            { required: true, message: '请输入营业时间', trigger: 'blur' }
          ],
          contacts: [
            { required: true, message: '请输入联系人', trigger: 'blur' }
          ],
          phoneNumber: [
            { required: true, message: '请输入联系电话', trigger: 'blur' },
            { min: 11, message: '长度至少11个字符', trigger: 'blur' }
          ],
          remark: [
            { required: true, message: '请输入商圈名', trigger: 'blur' }
          ],
          introduction: [
            { required: true, message: '请输入商家介绍', trigger: 'blur' },
            { min: 3, message: '长度在3个字符以上', trigger: 'blur' }
          ]
        }
      }
    },
    created: function () {
      // 获取存储在vuex里的商家数据
      this.form = this.$store.state.merchant
      this.area = this.form.fullName
      this.uploadData = { id: this.form.id }
      if (!this.form.longitude) {
        this.form.longitude = 104.089305
      }
      if (!this.form.latitude) {
        this.form.latitude = 30.571226
      }
      this.logoImg = [{url: this.form.logoImg}]
      this.getMerchantInfo()
    },
    methods: {
      getMerchantInfo () {
        this.$axios.get(SITEURL.MERCHANT_WAIT_ONLINE_INFO + '/' + this.form.id).then(response => {
          var sliders = response.data.data.merchantApplyImg
          for (var i in sliders) {
            this.sliderPic.push({url: sliders[i].applyImg})
          }
          this.categoryOptions = response.data.data.category
          this.tagOptions = response.data.data.tags
          this.form.introduction = response.data.data.introduction
        }).catch(error => {
          console.log(error)
        })
      },
      onSubmit (formName) {
        this.submitBtnDis = true
        // 表单验证
        if (!this.form.area) {
          this.$message.warning('请选择所属地区！')
          this.submitBtnDis = false
          return
        }
        if (this.$refs.coverUpload.uploadFiles[0].url === '' || this.$refs.coverUpload.uploadFiles[0].url === null) {
          this.$message.warning('请上传封面图！')
          this.submitBtnDis = false
          return
        }
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.loading = true
            this.$store.commit(MERCHANT_INFO, this.form)
            this.$axios.post(SITEURL.MERCHANT_ONLINE, this.form).then(response => {
              this.loading = false
              if (response.data.success) {
                this.$message.success('操作成功，' + response.data.message)
              } else {
                this.$message.error('操作失败，' + response.data.message)
              }
              this.submitBtnDis = false
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
      changeCategory (item) {
        this.form.category = item
      },
      changeTag (item) {
        this.form.tag = item
      },

      queryAreaSearch (queryString, cb) {
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
      handleAreaSelect (item) {
        this.form.area = item.id
      },

      // 上传图片相关
      handleRemoveCover (file, fileList) {
        if (this.isDelImg) {
          this.$axios.post(SITEURL.MERCHANT_WAIT_ONLINE_IMAGE_DEL, {id: this.form.id}).then(response => {
            if (response.data.success) {
              this.$message.success('操作成功，' + response.data.message)
            } else {
              this.$message.error('操作失败，' + response.data.message)
            }
          }).catch(error => {
            console.log(error)
          })
        }
      },
      handleRemoveSlider (file, fileList) {
        this.$axios.post(SITEURL.MERCHANT_WAIT_ONLINE_SLIDER_DEL, {merchantApply: this.form.id, applyImg: file.url}).then(response => {
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
          this.logoImg = [{url: response.data.logoImg}]
          this.form.logoImg = response.data.logoImg
          this.$message.success('操作成功，' + response.message)
        } else {
          this.$message.error('操作失败，' + response.message)
          fileList = []
        }
        if (fileList.length > 1) {
          fileList.splice(0, 1)
        }
//        this.imageUrl = URL.createObjectURL(file.raw)
      },
      handleUploadSliderSuccess (response, file, fileList) {
        if (response.success) {
          this.sliderPic.push({url: response.data.merchantApplyImg.applyImg})
          this.$message.success('操作成功，' + response.message)
        } else {
          this.$message.error('操作失败，' + response.message)
          fileList = []
        }
      },
      beforeCoverUpload (file) {
        const isJPG = file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png'
        const isLt2M = file.size / 1024 / 1024 < 1

        if (!isJPG) {
          this.$notify.error({title: '错误', message: '上传图片只能是 JPG 和 PNG格式!'})
        }
        if (!isLt2M) {
          this.$notify.error({title: '错误', message: '上传图片大小不能超过 1MB!'})
        }
        if (isJPG && isLt2M) {
          this.isDelImg = true
        } else {
          this.isDelImg = false
        }
        return isJPG && isLt2M
      },
      handlePictureCardPreview (file) {
        this.dialogImageUrl = file.url
        this.dialogVisible = true
      },

      // 分页相关
      handleCurrentChange (val) {
        this.currentPage = val
        console.log(`当前页: ${val}`)
      },

      // 地图相关
      handleSelect (item) {
        this.form.addr = item.value
        this.form.longitude = item.location.lng
        this.form.latitude = item.location.lat
        this.center.lng = item.location.lng
        this.center.lat = item.location.lat
      },
      // 点击商家地址input后图标时的事件处理
      handleMapClick (e) {
        this.$http.jsonp(SITEURL.BAIDU_MAP_URL + '/geocoder/v2/?address=' + this.form.addr + '&output=json&ak=EH07OrMrG9wr6sK9mqRa8meYx3MSGgep')
          .then(response => {
            if (response.data.status === 0) {
              var location = response.data.result.location
              this.form.longitude = location.lng
              this.form.latitude = location.lat
            }
          }, response => {
            // error callback
          })
      },
      showMap () {
        this.dialogMapVisible = true
        this.center.lng = this.form.longitude
        this.center.lat = this.form.latitude
      },
      syncCenter (e) {
        const {lng, lat} = e.target.getCenter()
        this.center.lng = lng
        this.center.lat = lat
      },
      syncZoom (e) {
        this.zoom = e.target.getZoom()
      },
      getMapPoint (e) {
        this.center = e.point
      },
      setMapPoint () {
        this.dialogMapVisible = false
        this.form.longitude = this.center.lng
        this.form.latitude = this.center.lat
      },
      closeMapDialog () {
        this.center.lng = this.form.longitude
        this.center.lat = this.form.latitude
      },
      queryAddress (queryString, cb) {
        const that = this
        this.$http.jsonp(SITEURL.BAIDU_MAP_URL + '/place/v2/suggestion?query=' + queryString + '&region=全国&city_limit=false&output=json&ak=EH07OrMrG9wr6sK9mqRa8meYx3MSGgep')
          .then(response => {
            if (response.data.status === 0) {
              var recommends = []
              var address = response.data.result
              for (var i = 0; i < address.length; i++) {
//                console.log(address[i])
                recommends.push({
                  value: address[i].name + ' ' + address[i].city + address[i].district,
                  location: address[i].location
                })
              }
              that.searchRecommends = recommends
            }
          }, response => {
            // error callback
          })
        var results = that.searchRecommends
        // 调用 callback 返回建议列表的数据
        cb(results)
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
    height: 790px;
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
  .dialog-map-footer {
    text-align: center;
  }
  .input-num {
    width: 100%;
  }
  .quill-editor {
    height: 650px;
  }
</style>
