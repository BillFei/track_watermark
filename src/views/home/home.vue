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
                action="#"
                :on-success="handleSucess"
                :on-error="handleError"
                :on-remove="handleRemove"
                :on-preview="handlePreview"
                :before-upload="handleUpload"
                :on-change="handleVideoChange"
                :auto-upload="false"
                accept="video/*"
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
  import {client,signatureUrl} from '@/utils/ali-oss'
  import {uploadVideo} from '@/api/video'

  const router=useRouter()

  const trackStore = useTrackStore()
  const videoInfo = ref('')

  // 进入首页就将上传标志为恢复成false
  trackStore.updateUploadInfo({
    isUpload: false
  })

  const handleSucess = (file) => {
    trackStore.updateUploadInfo({
      isUpload: true
    })
    router.push({
      name: 'Remove'
    })
  }

  const handleUpload = (file) => {
    if(localStorage.getItem('userInfo')){
    const isVideo = file.type.startsWith('video/');
    if (!isVideo) {
      ElMessage.error('Please upload the video file!');
      return
    }
    trackStore.updateVideoUploadLocalFile({
      localfile: URL.createObjectURL(file)
    })
    console.log(file)
  }else{
    router.push({name:'Login'})
  }
  }

  const handleVideoChange = (file)=>{
    if(localStorage.getItem('userInfo')){
    const fileName = `${Date.now()}-${file.name}`;
    const files = file.raw
    client.put(fileName, files).then(res => {     
      const oss_path = res.url
      // 上传成功之后，转换真实的地址
      signatureUrl(fileName).then( res => { 
        const userInfo = localStorage.getItem('userInfo')?JSON.parse(localStorage.getItem('userInfo')):'';
        uploadVideo({
          name:fileName,
          oss_path:oss_path
        },userInfo.username).then(res=>{
          if(!res.status === "PENDING") {
            videoInfo.value = JSON.stringify(res)
		      }else{
            ElMessage .error("Upload failed, please try again");
          }
          // if(res.status_code === 200) {
			    //   localStorage.setItem('userInfo',JSON.stringify(res.data))
		      // }else{
			    //   ElMessage .error(res.detail);
		      // }
        })

        trackStore.updateVideoUploadOSSURL({
          uploadOSSURL: res
        })
        trackStore.updateUploadInfo({
          isUpload: true
        })
        router.push({
          name: 'Remove'
        })
      })
    }).catch( err => { 
      ElMessage .error("Upload failed, please try again");
      console.log('上传失败',err)
    })
  }else{
        router.push({name:'Login'})
    }
  }

  if(localStorage.getItem("token")){
    if(!localStorage.getItem('userInfo')){
      getUserInfo().then(res=>{
        if(res.status_code === 200) {
          localStorage.setItem('userInfo',JSON.stringify(res.data))
        }else{
          ElMessage .error(res.detail);
        }
      })
    }
  }

  const handleError = (file) => {
    ElMessage.error('Please upload a video file again!');
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
