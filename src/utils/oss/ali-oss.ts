import OSS from 'ali-oss'

const client = new OSS({
    region: 'https://oss-cn-shanghai.aliyuncs.com',
    accessKeyId: 'LTAI5tGbr1Rz9jz67rW2Pie1',
    accessKeySecret: 'xxxxxx',
    bucket: 'teclips'
});

export default client;
