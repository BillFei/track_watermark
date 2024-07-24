// user interface
export interface UserProfile {
    userId: number
    icon: string
}

export interface UserInfo {
    userId: number
    name: string
    phone: string
    email: string
    type: string
    credit: number
    token: string
    profile: UserProfile
}

// video interface
export interface VideoInfo {
    id: number | string | null
    name: string | null
    uploadInfo: UploadInfo | null
    downloadInfo: DownloadInfo | null
}

export interface UploadInfo {
    fileName: string
    isUpload: boolean
    isInpainted: boolean
    uploadOSSURL: string | null
    localfile: string | Object
}

export interface DownloadInfo {
    fileName: string
    needCredit: boolean
    downloadOSSURL: string | Object | null
}

// language interface
export interface LanguageInfo {
    lng: string
}