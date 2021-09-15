import { Body, Controller,  Delete, Param,  Post, Put, UseGuards } from '@nestjs/common'; 
import { AuthGuard } from '@nestjs/passport';
import {  ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';   
import { TodosPayload, UpdateTokenParam, UpdateTodosPayload, DeletTokenParam } from './todos.payload';
import { TodosService } from './todos.service';
 
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
