import { defineStore } from 'pinia';
import {UserInfo, VideoInfo, UploadInfo, DownloadInfo, LanguageInfo} from "@/store/interface"

interface State {
    user: UserInfo | null
    video: VideoInfo | null
    lang: LanguageInfo | null
}

export const useTrackStore = defineStore("track", {
    //定义状态
    state: () =>{
        return {
            userInfo:{
                name:'',
                phone:'',
                email:'',
                type:'',
                credit: 0,
                token:''
            },
            lang:{
                lng:'en'
            },
            videoInfo: {
                id: '',
                name:'',
                uploadInfo: {
                    fineName:'',
                    isUpload: false,
                    isInpainted: false,
                    uploadOSSURL: '',
                    localfile: null
                },
                downloadInfo: {
                    fileName: '',
                    needCredit: false,
                    downloadOSSURL: ''
                }
            },
            uploadInfo: {
                fineName:'',
                isUpload: false,
                isInpainted: false,
                uploadOSSURL: null,
                localfile: null
            },
            downloadInfo: {
                fileName: '',
                needCredit: false,
                downloadOSSURL: null
            }
        }
    },
    //定义计算属性
    getters:{
        getUserInfo(state){
            return state.userInfo;
        },
        getLang(state){
            return state.lang.lng
        },
        getVideoInfo(state){
            return state.videoInfo
        },
        getUploadInfo(state) {
            return state.videoInfo.uploadInfo
        },
        getDownloadInfo(state) {
            return state.videoInfo.downloadInfo
        }
    },
    //定义提交函数
    actions:{
        updateLang(lang:string){
            this.lang=lang
        },
        initVideoInfo(video: VideoInfo) {
            this.videoInfo = Object.assign(video)
        },
        initUploadInfo(uploadInfo: UploadInfo) {
            this.videoInfo.uploadInfo = Object.assign(uploadInfo)
        },
        initDownloadInfo(downloadInfo: DownloadInfo) {
            this.videoInfo.downloadInfo = Object.assign(downloadInfo)
        },
        updateVideoUpload(video: VideoInfo) {
            this.videoInfo.uploadInfo.uploadOSSURL = video.uploadOSSURL
            this.videoInfo.id = video.id
        },
        updateDownload(video: VideoInfo) {
            this.videoInfo.downloadInfo.downloadOSSURL = video.downloadOSSURL
        },
        updateUploadInfo(uploadInfo: UploadInfo) {
            this.videoInfo.uploadInfo.isUpload = uploadInfo.isUpload
        },
        updateInpainted(uploadInfo: UploadInfo) {
            this.videoInfo.uploadInfo.isInpainted = uploadInfo.isInpainted
        },
        updateVideoUploadLocalFile(uploadInfo: UploadInfo) {
            this.videoInfo.uploadInfo.localfile = uploadInfo.localfile
        },
        updateVideoUploadOSSURL(uploadInfo: UploadInfo) {
            this.videoInfo.uploadInfo.uploadOSSURL = uploadInfo.uploadOSSURL
        },
        updateDownloadFile(downloadInfo: DownloadInfo) {
            //this.videoInfo.downloadInfo.downloadOSSURL = downloadInfo.downloadOSSURL
            this.videoInfo.uploadInfo.isInpainted = downloadInfo.isInpainted
        }
    }
})
