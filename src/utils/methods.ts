export const genUploadFileName = (name: string) =>  {
    return `${Date.now()}-${name}`;
}