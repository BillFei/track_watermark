<template>
  <div class="container">
    <div class="card">
      <el-row :gutter="20" justify="center">
        <el-col :span="12">
          <div class="img-card">
            <div class="video-card">
              <video preload="auto" class="video-play" poster="https://sb.kaleidousercontent.com/67418/840x560/d749ed76de/manuel-poster.jpg" autoplay playsinline="true" src="https://sb.kaleidousercontent.com/67418/x/9289c7b8dd/manuel_compressed.mp4"></video>
            </div>
            <div class="remove-font">Remove Video</div>
            <div class="watermark-font" style="">Watermark</div>
          </div>
        </el-col>
        <el-col :span="12" style="margin-top:150px;">
          <el-card class="upload-card">
            <el-upload
                class="upload"
                drag
                action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                :on-success="handleSucess"
                :on-error="handleError"
                :on-remove="handleRemove"
                :on-preview="handlePreview"
                multiple
              >
                <el-button
                  text
                  bg
                  round
                  size="large"
                  class="upload-btn"
                >
                  Upload Video
                </el-button>
                <div class="drop-file">Or drop a file</div>
              </el-upload>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import { ElMessageBox, ElMessage } from 'element-plus'
  import { useRouter, Router } from 'vue-router'
  import { storeToRefs } from 'pinia'
  import { useTrackStore } from '@/store/track'
  import {getUserInfo} from '@/api/login'

  const router=useRouter()

  const trackStore = useTrackStore()

  const handleSucess = (file) => {
    console.log(file.name)
  }

  if(localStorage.getItem("token")){
    getUserInfo().then(res=>{
    console.log(res)
    if(res.status_code === 200) {
			localStorage.setItem('userInfo',JSON.stringify(res.data))
		}else{
			ElMessage .error(res.detail);
		}
  })
  }

  const handleError = (file) => {
    trackStore.updateUploadInfo({
      isUpload: true
    })
    router.push({
      name: 'Remove'
    })
  }

  const handleRemove = (file) => {

  }

  const handlePreview = (file) => {

  }

</script>

<style  lang="scss" scoped>
.container{
  padding-top: 40px;
  .card{
    .img-card{
      margin-top:20px;
      max-width:500px;
      margin-left: 80px;
      justify-content: center;

      .video-card {
        border: 0px solid #dcdfe6;
        border-radius: 20px 20px;
        width: 360px;
        max-width: 500px;

        .video-play {
          height: 400px;
          width: 500px;
        }
      }

      .remove-font {
        font-size: 3.75rem;
        font-weight: bold;
        line-height: 4.25rem;
        margin-top:20px;
        text-align:left;
        width: 500px;
      }

      .watermark-font {
        font-size: 3.75rem;
        font-weight: bold;
        line-height: 4.25rem;
        width: 500px;
      }
    }

    .upload-card {
      width:460px;
      height:400px;
      justify-content: center;
      text-align: center;
      border-radius: 20px 20px;
    }

    .upload{
      width: 400px;
      height: 300px;
      margin-left: 10px;
      margin-top: 100px;

      div.el-upload-dragger {
        border: 0px solid #dcdfe6 !important;
      }

      .upload-btn {
        font-size: 1.75rem;
        color: white;
        background-color: #0F70E6;
        height: 58px;
        width: 232px;
        border-radius: 30px 30px;
      }

      .drop-file {
        font-size: 1.75rem;
        line-height: 2.00rem;
        font-weight: 600;
        width:350px;
        margin-top: 10px;
      }
    }
  }
}
</style>
