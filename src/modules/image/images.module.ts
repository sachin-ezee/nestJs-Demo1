import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImagesController } from './images.controller';
import { ImagesService } from './images.service';
import { Images } from './images.entity';
import { PassportModule } from '@nestjs/passport';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [TypeOrmModule.forFeature([Images]), PassportModule.register({ defaultStrategy: 'jwt' }),   ],
    controllers: [ImagesController],
    providers: [ImagesService],
  })
  export class ImageModule {}