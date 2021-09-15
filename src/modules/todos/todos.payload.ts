import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Unique } from '../common'; 
import { Todo } from './todos.entity';

export class TodosPayload {
  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  @Unique([Todo])
  title: string;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  @Unique([Todo])
  description: string;

  
  @ApiProperty({
    required: true,
  })
  @IsNotEmpty() 
  is_done: boolean;

}
