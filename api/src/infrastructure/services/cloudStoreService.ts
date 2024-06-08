import B2 from "backblaze-b2";
import { ICloudStoreService } from "src/domain/services/ICloudStoreService";

export class CloudStoreService implements ICloudStoreService {
  b2: B2;
  constructor() {
    this.b2 = new B2({
      applicationKeyId: "004061164e29fc20000000002",
      applicationKey: "K004RTlE0f+nvXLDBWHURiK9UhG9+Ts",
    });
  }

  async uploadFile(fileName: string, file: any) {
    await this.b2.authorize();

    const {
      data: { uploadUrl, authorizationToken },
    } = await this.b2.getUploadUrl({
      bucketId: "50b6d1510634fe2289ff0c12",
    });

    await this.b2.uploadFile({
      uploadUrl,
      uploadAuthToken: authorizationToken,
      fileName,
      data: file,
    });

    const url = `https://f004.backblazeb2.com/file/infinity-base/${fileName}`;

    return url;
  }
}
