import {
  Service,
  Inject,
  EventManager,
  ContainerInstance,
} from "@bluelibs/core";
import { ObjectId } from "@bluelibs/ejson";
import { Collection } from "@bluelibs/mongo-bundle";
import { FileService } from "@bundles/FileBundle/services";
import { FileSecurityService } from "@bundles/FileBundle/services/FileSecurity.service";
import { MimeType } from "@bundles/FileBundle/services/types";
import { AvatarServiceUploadParams } from "./types";

@Service()
export class AvatarService {
  constructor(protected readonly container: ContainerInstance) {}

  @Inject()
  private fileService: FileService;

  @Inject()
  private fileSecurityService: FileSecurityService;

  // TODO: why "as any" ? :(
  public async uploadAvatar<T>(params: AvatarServiceUploadParams<T>) {
    const { userId, avatar, avatarIdField, documentFilter } = params;

    if (avatar) {
      this.fileSecurityService.checkMimeType(await avatar, MimeType.IMAGE);
    }

    const collection = this.container.get(params.collection) as Collection<T>;

    const document = (await collection.findOne(documentFilter)) as T;

    const oldAvatarId = document[avatarIdField] as unknown as ObjectId;

    if (oldAvatarId) {
      await this.fileService.remove(oldAvatarId);

      await collection.updateOne(
        documentFilter,
        {
          $unset: {
            [avatarIdField]: 1,
          } as any,
        },
        {
          context: {
            userId,
          },
        }
      );
    }

    if (!avatar) {
      return null;
    }

    const newAvatar = await this.fileService.upload(avatar, userId, {
      retrieveDownloadURL: true,
    });

    await collection.updateOne(
      documentFilter,
      {
        $set: {
          [avatarIdField]: newAvatar._id,
        } as any,
      },
      {
        context: {
          userId,
        },
      }
    );

    return newAvatar;
  }
}
