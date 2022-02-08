import {
  Service,
  Inject,
  EventManager,
  ContainerInstance,
} from "@bluelibs/core";
import { ObjectId } from "@bluelibs/ejson";
import { S3UploadService, FileManagementService } from "@bluelibs/x-s3-bundle";
import { FileUpload } from "graphql-upload";
import { FileServiceUploadOptions } from "./types";

@Service()
export class FileService {
  constructor(protected readonly container: ContainerInstance) {}

  @Inject()
  private s3UploadService: S3UploadService;

  @Inject()
  private fileManagementService: FileManagementService;

  public async upload(
    file: Promise<FileUpload>,
    userId: ObjectId,
    options: FileServiceUploadOptions = {}
  ) {
    const appFile = await this.s3UploadService.upload(file, {
      uploadedById: userId,
    });

    if (options.retrieveDownloadURL) {
      appFile.downloadUrl = this.s3UploadService.getUrl(appFile.path);
    }

    return appFile;
  }

  public remove(appFileId: ObjectId) {
    return this.fileManagementService.removeFile(appFileId);
  }
}
