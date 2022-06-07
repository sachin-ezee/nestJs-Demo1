import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty,IsDefined, IsNumberString} from 'class-validator';
import { Unique } from '../common'; 
import { Images } from './images.entity';
 

export interface ImageRequest {
  files: {
    file: {
      size?: number
      mimetype?: string
      width?: string
      height?: string
      name?: string
      mv?: (arg0: string) => unknown
    }
  }
  body: {
    imageName: string
  }
}