<template>
  <div class="container">
    <div class="card">
      <el-row justify="center">
        <el-col :span="24" :push="8" v-if="!trackStore.getUploadInfo.isUpload">
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
                :show-file-list="false"
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
        <el-col :span="12" :push="2" v-if="trackStore.getUploadInfo.isUpload">
          <!-- <el-col :span="trackStore.uploadInfo.isInpainted ? 12 : 24" :push="trackStore.uploadInfo.isInpainted ? 2 : 8" v-if="trackStore.uploadInfo.isUpload"> -->
            <!-- poster="https://sb.kaleidousercontent.com/67418/840x560/d749ed76de/manuel-poster.jpg"  -->
          <div class="img-card">
            <div class="video-card">
              <video 
                ref="uploadPlayer"
                preload="auto" 
                class="video-play" 
                poster="#" 
                autoplay 
                playsinline="true"
                fluid="true"
                controls="true"
                :src="trackStore.getUploadInfo.uploadOSSURL"></video>
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
        <el-col :span="12" v-if="trackStore.getUploadInfo.isUpload && trackStore.getUploadInfo.isInpainted">
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
                :src="trackStore.getDownloadInfo.downloadOSSURL"
                >
                </video>
            </div>
            <el-button
                  text
                  bg
                  round
                  size="large"
                  class="upload-btn"
                  @click="InpaiintOkViideo()"
                >
                  Download Video
            </el-button>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
  <el-dialog v-model="theTips.show" title="Tips" width="500px" center>
    <span>{{ theTips.attention }}</span>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="toMembership(false)">Cancel</el-button>
        <el-button type="primary" @click="toMembership(true)">
          Confirm
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
  import { ElMessageBox, ElMessage, ElLoading} from 'element-plus'
  import { useRouter, Router } from 'vue-router'
  import { storeToRefs } from 'pinia'
  import { useTrackStore } from '@/store/track'
  import {client,signatureUrl,getDownloadUrl} from '@/utils/ali-oss'
  import { genUploadFileName } from '@/utils/methods'
  import { onMounted, ref } from 'vue'
  import {uploadVideo,getVideoOneInfo} from '@/api/video'

  const router=useRouter()

  const theTips = ref({
    show:false,
    attention:''
  })

  const trackStore = useTrackStore()
  
  const userInfo = localStorage.getItem('userInfo')?JSON.parse(localStorage.getItem('userInfo')):'';

  const handleSucess = (file) => {
    console.log('上传成功，文件名：',file.name)
  }

  const toMembership = (type) =>{
    // console.log(type)
    if(type){
      theTips.value.show = false
      router.push({name:'Price'})
    }else{
      theTips.value.show = false
    }
  }

  const handleVideoChange = (file)=>{
    if(userInfo){
     checkMediaFile(file.raw)
    }
  }

  //读取提示
  const loadingVideo  = ref(null);
  const windows: any = window
  //获取视频详细信息
  const checkMediaFile = (file: any): Promise<any> => {
    loadingVideo.value = ElLoading.service({
        text:'Reading...'
    }); // 开始加载
    return new Promise((r, j) => {
      const getSize = () => file.size
      const readChunk = (chunkSize, offset) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader()
          reader.onload = (event: any) => {
            if (event.target.error) {
              reject(event.target.error)
            }
            resolve(new Uint8Array(event.target.result))
          }
          reader.readAsArrayBuffer(file.slice(offset, offset + chunkSize))
        })
      windows.MediaInfo().then((media) => {
          media.analyzeData(getSize, readChunk).then((result) => {
            console.log('视频信息：',result.media.track[1]);
            loadingVideo.value.close(); // 结束加载
            uploadVideoToOss(result,file);
            return result
          }).catch((error) => {
            j(error)
          })
      }).catch((error) => {
        j(error)
      })
    })
  }

  //视频上传前期检验
  const uploadVideoToOss = (videoInfo,file) =>{
    console.log(videoInfo,file)
    const vinfo = videoInfo.media.track[1]
    const video_credits = vinfo.FrameCount / 15;
    console.log(video_credits)
    if(userInfo.role === "NORMALMEMBER"){
      if(vinfo.Duration > 60){
        //提示充值
        theTips.value.show = true
        theTips.value.attention = 'This function needs to open a membership, confirm to open a member?'
      }else{  
        //上传视频
        toUploadVideo(file);
      }
    }else{
      const user_credis = userInfo.credits;
      const video_credits = vinfo.FrameCount / 15;
      if(video_credits <= user_credis){
        toUploadVideo(file);
      }else{
        theTips.value.show = true
        theTips.value.attention = 'Insufficient credits, are you to buy?'
      }
    }
  }

  //上传视频到oss
  const toUploadVideo = (file) =>{
    const fileName = genUploadFileName(file.name)
    console.log(file)
    client.put(fileName, file).then(res => {
      const oss_path = res.url
      // 上传成功之后，转换真实的地址
      signatureUrl(fileName).then( resOss => {
        console.log('upload-----',res)
        uploadVideo({
          name:fileName,
          oss_path:oss_path
        },userInfo.username).then(resVideo=>{
          if (resVideo && resVideo.id != null) {
            trackStore.initVideoInfo({
              name: fileName,
              uploadInfo: {
                uploadOSSURL: resVideo.oss_path,
                fileName: fileName
              },
              id: resVideo.id
            })
            trackStore.updateUploadInfo({
              isUpload: true
            })
          } else {
            ElMessage .error("Upload failed, please try again");
          }
        })
        trackStore.updateVideoUploadOSSURL({
          uploadOSSURL: resOss
        })
        trackStore.updateUploadInfo({
          isUpload: true
        })
      })
    }).catch( err => { 
      console.log('上传失败',err)
    })
  }

  const beforeUpload = (file) => {
    console.log(userInfo,file)
    if(userInfo){
    // 可以在这里进行文件类型和大小的校验
      console.log(file);
      const isVideo = file.type.startsWith('video/');
      if (!isVideo) {
        ElMessage.error('Please upload the video file!');
      }
      return isVideo;
    }else{
      router.push({name:'Login'})
    }
  }

  const handleError = (file) => {
    console.log('上传失败:',file)
    trackStore.updateUploadInfo({
      isUpload: false
    })
  }

  const handleRemove = (file) => {

  }

  const handlePreview = (file) => {

  } 

 
  const intervalId = ref(null)
  const loadingInstance  = ref(null);

  const inpaintClick = () => {
    loadingInstance.value = ElLoading.service({
      text:'Inpainting'
    }); // 开始加载
    intervalId.value = setInterval(inpainting, 10000);
  }

  const inpainting = () =>{
    const videoInfo = trackStore.getVideoInfo
    const id = videoInfo.id
    if (id != null && id != '') {
      getVideoOneInfo(id,userInfo.username).then(res =>{
        console.log(res)
        if(res.status === "FINISHED"){
          loadingInstance.value.close(); // 结束加载
          clearInterval(intervalId.value);
          const downloadUrlTmp = res.oss_download_path
          trackStore.initDownloadInfo({
            downloadOSSURL: downloadUrlTmp,
            fileName: videoInfo.name
          })
          trackStore.updateDownloadFile({
            isInpainted: true,
            downloadOSSURL: downloadUrlTmp
          })
        }
      })
    } else {
      loadingInstance.value.close();
      clearInterval(intervalId.value);
      ElMessage.error('Please sign in first!');
      router.push({name:'Login'})
    }
  }

  //下载视频
  const InpaiintOkViideo = () =>{
    const downloadInfoTmp = trackStore.getDownloadInfo
    const link = document.createElement('a');
    console.log()
    link.href = downloadInfoTmp.downloadOSSURL ; // 设置视频链接为href属性
    //link.download = 'Repaired_video.mp4'; // 设置下载时的文件名

    // 模拟点击事件以触发下载
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link); // 清理DOM
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
