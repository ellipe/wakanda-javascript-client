import AbstractService from './abstract-service';
import Entity from '../../presentation/entity';
import Media from '../../presentation/media';
import HttpResponse from '../http/http-response';
import {EntityDBO} from '../../business/entity-business';
import {MediaBaseService} from './base/media-base-service';

class MediaService extends AbstractService {
  
  private dataClassName: string;
  private entity: Entity;
  private isImage: boolean;
  private media: Media;
  private attributeName: string;
  
  constructor({wakJSC, mediaBusiness, media, attributeName, dataClassBusiness}) {
    super({wakJSC});

    this.dataClassName = dataClassBusiness.dataClass.name;
    this.entity = mediaBusiness.entity;
    this.isImage = mediaBusiness.isImage;
    this.media = media;
    this.attributeName = attributeName;
  }

  upload(file: any, mimeType: string): Promise<HttpResponse> {
    return MediaBaseService.upload({
      httpClient: this.httpClient,
      dataClassName: this.dataClassName,
      entityKey: this.entity._key,
      attributeName: this.attributeName,
      isImage: this.isImage,
      file
    });
  }

  delete(): Promise<HttpResponse> {
    return MediaBaseService.delete({
      httpClient: this.httpClient,
      dataClassName: this.dataClassName,
      entityKey: this.entity._key,
      entityStamp: this.entity._stamp,
      attributeName: this.attributeName
    });
  }
}

export default MediaService;