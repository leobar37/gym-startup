import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  Cloudinary, CLOUDINARY, getCloudinaryConfig
} from './Cloudinary.provider';
@Injectable()
export class CloudinaryService {
  
  constructor(
    @Inject(CLOUDINARY) private cloudinary: Cloudinary,
    private configService: ConfigService
  ) {}

  get config() {
    return getCloudinaryConfig(this.configService);
  }
  /**
   * @docs https://cloudinary.com/documentation/generate_upload_signature_tutorial
   */
  //
  generateSignature(options: { public_id?: string }) {
    const timestamp = Math.round(new Date().getTime() / 1000);

    const signature = this.cloudinary.utils.api_sign_request(
      {
        timestamp: timestamp,
        upload_preset: this.config.preset,
        public_id: options.public_id ?? undefined,
      },
      this.config.api_secret
    );
    return {
      timestamp,
      signature,
    };
  }
  //
  public async deleteFile(publicId: string) {
    return this.cloudinary.uploader.destroy(publicId);
  }
}
