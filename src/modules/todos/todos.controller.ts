import { Body, Controller,  Logger,  Post } from '@nestjs/common'; 
import {  ApiResponse, ApiTags } from '@nestjs/swagger';   
import { TodosPayload } from './todos.payload';
import { TodosService } from './todos.service';
 
@Controller('todos') 
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
 
}
