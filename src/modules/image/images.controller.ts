import { Body, Controller,  Delete, Param,  Post, Put, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common'; 
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiResponse, ApiTags } from '@nestjs/swagger';   
import { ImageRequest } from './images.payload';
import { FileExtender, ImagesService } from './images.service';
import { Express } from 'express';
import { extname } from 'path';
import { diskStorage } from 'multer';

@Controller('images')
@ApiTags('image')
export class ImagesController {
    constructor(
        private readonly imageService: ImagesService, 
      ) {}

 
  @Post('image')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        // imageId: { type: 'number'},
        imageName: { type: 'string' }, 
        file: {
          type: 'file',
        },
      },
    },
  }) 
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: 'assets/profile'
      , filename: (req, file, cb) => {
        // Generating a 4 random chars long string
        const randomName = Array(4).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
        // Calling the callback passing the random name generated with the original extension name
        cb(null, `${randomName}${file.originalname}`)
       // cb(null, `${file.originalname}`)
      }
    })
  }))
  @ApiResponse({ status: 201, description: 'Successful Uploaded' })
  async imageUpdate(@UploadedFile() file: Express.Multer.File, @Body() parm): Promise<any> { 
    const  contentData = {
      imageName: parm.imageName,
      imageUrl: file.path,
    }
     const imageAdd =  await this.imageService.createImageContent(contentData);
  
    return await imageAdd;
  }

  
}
