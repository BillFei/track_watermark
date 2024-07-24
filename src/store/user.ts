import { defineStore } from 'pinia';
import {UserProfile, UserInfo} from '@/store/interface'

export const useUserStore = defineStore("user",{
    //定义状态
    state: () =>{
        return {
            userInfo:{
                userId: 0,
                name:'',
                phone:'',//0 为普通用户，1 为管理员
                email: '',
                type: '',
                credit: 0,
                token: '',
                userProfile: {
                    userid: 0
                }
            },
            lang:'en'
        }
    },
    //定义计算属性
    getters:{
        getUserAdmin(state){
            return state.userInfo.is_admin;
        },
        getUserInfo(state){
            return state.userInfo;
        },
        getLang(state){
            return state.lang
        }
    },
    //定义提交函数
    actions:{
        initUserInfo(userInfo: UserInfo) {
            this.userInfo = Object.assign({}, userInfo)
        },
        updateLang(lang:string){
            this.lang=lang
        }
    }
})
