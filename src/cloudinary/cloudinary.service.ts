import { Injectable, Inject } from '@nestjs/common';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import { CLOUDINARY } from './constants';
import * as toStream from 'buffer-to-stream';



// Create an interface for the Cloudinary type
interface CloudinaryType {
  uploader: {
    upload_stream: (
      options: any,
      callback: (error: any, result: UploadApiResponse) => void
    ) => any;
  };
  // Add other methods you use
}

@Injectable()
export class CloudinaryService {
  constructor(
    @Inject(CLOUDINARY) 
    private readonly cloudinary: CloudinaryType
  ) {}

  async uploadImage(file: Express.Multer.File): Promise<{url: string; public_id: string}> {
    return new Promise((resolve, reject) => {
      const uploadStream = this.cloudinary.uploader.upload_stream(
        { resource_type: 'auto' },
        (error, result) => {
          if (error) return reject(error);
          resolve({
            url: result.secure_url,
            public_id: result.public_id,
          });
        }
      );

      // uploadStream.end(file.buffer);
      toStream(file.buffer).pipe(uploadStream);
    });
  }
}