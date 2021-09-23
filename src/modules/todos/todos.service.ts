import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor, NotAcceptableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable } from 'rxjs';
import { Repository, getConnection } from 'typeorm';
import { Todo, TodosFillableFields, UpdateTodosFillableFields } from './todos.entity';

@Injectable()
export class FileExtender implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    req.file['imageName'] = req.body.imageName; 
    return next.handle();
  }
}
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private readonly todosRepository: Repository<Todo>,
  ) {}

  async create(payload: TodosFillableFields) {
    const dataSend =  await getConnection()
      .createQueryBuilder()
      .insert()
      .into(Todo)
      .values({ title: payload.title, description: payload.description, is_done: payload.is_done, create_at: new Date().getTime(), updated_at: new Date().getTime() },)
      .execute();
    return {
      insertId: dataSend.identifiers[0].id,
      massage: "Created"
    } 
  }

  async create2(payload: TodosFillableFields) {
    const addTodoObject = {
      title: payload.title,
      description: payload.description,
      is_done: payload.is_done,
      create_at: new Date().getTime(),
      updated_at: new Date().getTime()
    }
    const createTodoData = await this.todosRepository.save(addTodoObject)
    return {
      insertId: createTodoData.id,
      massage: "Created"
    } 
  }
  
  async update(id: number, payload: UpdateTodosFillableFields) {
    let msg = ''
    const addTodoObject = {
      title: payload.title,
      description: payload.description,
      is_done: payload.is_done, 
      updated_at: new Date().getTime()
    }
    const updateTodoData = await this.todosRepository.update(id, addTodoObject)
    if(updateTodoData.affected === 0)
    {
      msg = 'No record found for Update'
    } else {
      msg =  "Updated"
    }
      
    return { 
      massage: msg
    }
  }

  async createImageContent(contentData) { 
    const contentFile = contentData
    console.log(contentFile)
    return contentFile;
  }
  
  async delete(id: number) {
    let msg = ''
     
    const deleteTodoData = await this.todosRepository.delete(id)
    if(deleteTodoData.affected === 0)
    {
      msg = 'No record found for delete'
    } else {
      msg =  "deleted"
    }
      
    return { 
      massage: msg
    }
  }
}
