<template>
  <div class="container">
    <div class="card">
      <el-row justify="center">
        <el-col :span="24" :push="8" v-if="!isUpload">
          <!-- <el-col :span="24" :push="8" v-if="!trackStore.uploadInfo.isUpload"> -->
          <el-card class="upload-card" style="">
            <!-- action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" -->
            <el-upload
                class="upload"
                drag
                action="#"
                :on-success="handleSucess"
                :on-error="handleError"
                :on-remove="handleRemove"
                :on-preview="handlePreview"
                :on-change="handleVideoChange"
                :before-upload="beforeUpload"
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
                  slot="trigger" type="primary"
                >
                  Upload Video
                </el-button>
                <div class="drop-file" style="font-size: 1.20rem;line-height: 1.75rem;font-weight: 600;width:350px;margin-top: 10px;">Or drop a file</div>
              </el-upload>
          </el-card>
        </el-col>
        <el-col :span="12" :push="2" v-if="isUpload">
          <!-- <el-col :span="trackStore.uploadInfo.isInpainted ? 12 : 24" :push="trackStore.uploadInfo.isInpainted ? 2 : 8" v-if="trackStore.uploadInfo.isUpload"> -->
            <!-- poster="https://sb.kaleidousercontent.com/67418/840x560/d749ed76de/manuel-poster.jpg"  -->
          <div class="img-card">
            <div class="video-card">
              <video 
                preload="auto" 
                class="video-play" 
                poster="#" 
                autoplay 
                playsinline="true"
                fluid="true"
                controls="true"
                :src="JSON.parse(uploadVideoOssAddress)"></video>
            </div>
            <el-button
                  text
                  bg
                  round
                  size="large"
                  class="upload-btn"
                  @click="inpaintClick()"
                >
                  Inpaint Video
            </el-button>
          </div>
        </el-col>
        <el-col :span="12" v-if="trackStore.uploadInfo.isUpload && trackStore.uploadInfo.isInpainted">
          <div class="img-card">
            <div class="video-card">
              <video 
                preload="auto" 
                class="video-play" 
                poster="https://sb.kaleidousercontent.com/67418/840x560/d749ed76de/manuel-poster.jpg" 
                autoplay 
                playsinline="true"
                fluid="true"
                controls="true"
                src="https://sb.kaleidousercontent.com/67418/x/9289c7b8dd/manuel_compressed.mp4"></video>
            </div>
            <el-button
                  text
                  bg
                  round
                  size="large"
                  class="upload-btn"
                >
                  Download Video
            </el-button>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ElMessageBox, ElMessage } from 'element-plus'
  import { useRouter, Router } from 'vue-router'
  import { storeToRefs } from 'pinia'
  import { useTrackStore } from '@/store/track'
  import {client,signatureUrl,uploadVideo} from '@/utils/ali-oss'
import { onMounted, ref } from 'vue'

  const trackStore = useTrackStore()
  const uploadVideoOssAddress = ref('')
  const isUpload = ref(false)

  onMounted(()=>{
    console.log(client)
  })

  const handleSucess = (file) => {
    console.log('上传成功，文件名：',file.name)
  }

  const handleVideoChange = (file)=>{
    console.log('视频文件：',file)
      const fileName = `${Date.now()}-${file.name}`;
      const files = file.raw
      console.log(fileName)
      const headers = {token:'123456'}
      client.put(fileName, files,{headers}).then(res => {     
        ElMessage.success('The video uploaded successfully')
        console.log('上传成功：',res)
        // 上传成功之后，转换真实的地址
        signatureUrl(fileName).then( res => {          
          console.log('oss视频地址：',res)  
          uploadVideoOssAddress.value = JSON.stringify(res)   
          isUpload.value = true
          console.log(JSON.parse(uploadVideoOssAddress.value))
        })
      }).catch( err => { 
        console.log('上传失败',err)
      })
  }

  const beforeUpload = (file) => {
    // 可以在这里进行文件类型和大小的校验
    const isVideo = file.type.startsWith('video/');
    if (!isVideo) {
      ElMessage.error('Please upload the video file!');
    }
    return isVideo;
  }

  const handleError = (file) => {
    console.log('上传失败:',file)
    trackStore.updateUploadInfo({
      isUpload: true
    })
  }

  const handleRemove = (file) => {

  }

  const handlePreview = (file) => {

  }

  const inpaintClick = () => {
    trackStore.updateInpainted({
      isInpainted: true
    })
  }

</script>

<style  lang="scss" scoped>
.container{
  padding-top: 40px;
  .card{
    .upload-card {
      width:460px;
      height:400px;
      justify-content: center;
      text-align: center;
      border-radius: 20px 20px;
      margin-top: 100px;

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
    .img-card{
      margin-top:20px;
      max-width:560px;
      margin-left: 80px;

      .upload-btn {
        margin-top: 30px;
        font-size: 1.75rem;
        color: white;
        background-color: #0F70E6;
        height: 48px;
        width: 232px;
        border-radius: 30px 30px;
        line-height: 48px;
        margin-left: 154px;
      }

      .video-card {
        border: 2px solid #dcdfe6;
        border-radius: 20px 20px;
        width: 540px;
        max-width: 560px;
        display: flex;
        justify-content: center;

        .video-play {
          height: 400px;
          width: 500px;
        }
      }
    }
  }
}
</style>
