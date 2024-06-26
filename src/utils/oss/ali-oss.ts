import OSS from 'ali-oss'

const client = new OSS({
    region: 'xxxx',
    accessKeyId: 'xxxx',
    accessKeySecret: 'xxxxxx',
    bucket: 'teclips'
});

export default client;
