export interface ICloudStoreService {
  uploadFile(fileName: string, file: any): Promise<string>;
}
