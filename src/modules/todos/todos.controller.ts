import { Body, Controller,  Delete, Param,  Post, Put, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common'; 
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import {  ApiBearerAuth, ApiBody, ApiConsumes, ApiResponse, ApiTags } from '@nestjs/swagger';   
import { TodosPayload, UpdateTokenParam, UpdateTodosPayload, DeletTokenParam, ImageRequest } from './todos.payload';
import { FileExtender, TodosService } from './todos.service';
import { Express } from 'express';
import { extname } from 'path';
import { diskStorage } from 'multer';

@Controller('todos')
@ApiTags('todos')
export class TodosController {
    constructor(
        private readonly todoService: TodosService, 
      ) {}

      
  @Post('add')
  @ApiResponse({ status: 201, description: 'Successful Registration' }) 
  async register(@Body() payload: TodosPayload): Promise<any> {
    const tokanAdd =  await this.todoService.create(payload);
     return await tokanAdd;
  }
 
  @Post('add2')
  @ApiResponse({ status: 201, description: 'Successful Registration' }) 
  async register2(@Body() payload: TodosPayload): Promise<any> {
    const tokanAdd =  await this.todoService.create2(payload);
     return await tokanAdd;
  }

  @Put('update/:id') 
  @ApiResponse({ status: 201, description: 'Successful Updated' })
  async update(@Param() param: UpdateTokenParam,@Body() payload: UpdateTodosPayload): Promise<any> {
    const tokanAdd =  await this.todoService.update(param.id, payload);
     return await tokanAdd;
  }
 
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
        cb(null, `${randomName}${file.originalname}${extname(file.originalname)}`)
       // cb(null, `${file.originalname}`)
      }
    })
  }))
  @ApiResponse({ status: 201, description: 'Successful Uploaded' })
  async imageUpdate(@UploadedFile() file: Express.Multer.File, @Body() parm): Promise<any> {
    console.log(parm.imageId);
    console.log(file);
    // const tokanAdd =  await this.todoService.createImageContent(contentData);
    // //  console.log(tokanAdd);
    //  return await true;
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Delete(':id') 
  @ApiResponse({ status: 201, description: 'Successful Deleted' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async delete(@Param() param: DeletTokenParam): Promise<any> {
    const tokanAdd =  await this.todoService.delete(param.id);
     return await tokanAdd;
  }
}
