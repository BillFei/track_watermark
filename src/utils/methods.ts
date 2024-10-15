import { getUserInfo } from '@/api/login'
import { ElMessage } from 'element-plus'

export const genUploadFileName = (name: string) =>  {
    return `${Date.now()}-${name}`;
}

export const getUinfo = () => {
    if(localStorage.getItem("token")){
        getUserInfo().then(res=>{
            if(res.status_code === 200) {
                localStorage.setItem('userInfo',JSON.stringify(res.data))
            }else{
                ElMessage.error(res.detail);
            }
        })
    }
}