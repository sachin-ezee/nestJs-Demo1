import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor, NotAcceptableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable } from 'rxjs';
import { Repository, getConnection } from 'typeorm';
import { Images, ImagesFillableFields } from './images.entity';

@Injectable()
export class FileExtender implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    req.file['imageName'] = req.body.imageName; 
    return next.handle();
  }
}
export class ImagesService {
  constructor(
    @InjectRepository(Images)
    private readonly todosRepository: Repository<Images>,
  ) {}
  
  async createImageContent(contentData) { 
    const contentFile = contentData
    console.log(contentFile)
    return contentFile;
  }
   
}
