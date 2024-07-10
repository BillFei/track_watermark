import request from "@/utils/request";

//视频上传
export const uploadVideo = (data: object,username: string) => {
    return request({
        url: `/v1/${username}/video`,
        method: "POST",
        data,
    });
};

//视频上传
export const getVideoOneInfo = (id: number,username: string) => {
    return request({
        url: `/v1/${username}/video/${id}`,
        method: "GET"
    });
};