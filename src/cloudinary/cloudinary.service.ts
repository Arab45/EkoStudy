import { Injectable, Inject } from '@nestjs/common';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import { CLOUDINARY } from './constants';

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

  async uploadImage(file: Express.Multer.File): Promise<string> {
    return new Promise((resolve, reject) => {
      const uploadStream = this.cloudinary.uploader.upload_stream(
        { resource_type: 'auto' },
        (error, result) => {
          if (error) return reject(error);
          resolve(result.secure_url);
        }
      );

      uploadStream.end(file.buffer);
    });
  }
}