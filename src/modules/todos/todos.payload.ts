import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty,IsDefined, IsNumberString} from 'class-validator';
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
    default: false,
  })
  @IsNotEmpty() 
  is_done: boolean;

}

export class UpdateTokenParam {  
  @ApiProperty({
    required: true,
  })
  @IsDefined()
  @IsNotEmpty({ message: 'id is not empty' }) 
  @IsNumberString({}, { message: 'Id Must be interger' })
  id: number
}


export class UpdateTodosPayload {
  @ApiProperty({
    required: true,
  })
  @IsNotEmpty() 
  title: string;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty() 
  description: string;
  
  @ApiProperty({
    required: true,
  })
  @IsNotEmpty() 
  is_done: boolean;

}


export class DeletTokenParam {  
  @ApiProperty({
    required: true,
  })
  @IsDefined()
  @IsNotEmpty({ message: 'id is not empty' }) 
  @IsNumberString({}, { message: 'Id Must be interger' })
  id: number
}
 