// oss.js
import OSS from 'ali-oss';
 
export const client = new OSS({
  region: '******',
  accessKeyId: '******',
  accessKeySecret: '******',
  bucket: '******',
});

// 上传成功之后，转换真实的地址
export const signatureUrl= async (ObjName) => {    
    try {        
      let result = await client.signatureUrl(`${ObjName}`)    
      return result  
    } catch (e) {    
      console.log(e)  
    }
}
 