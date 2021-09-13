import { Injectable, Logger, NotAcceptableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getConnection } from 'typeorm';
import { Todo, TodosFillableFields } from './todos.entity';

@Injectable()
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
      insertId: dataSend.generatedMaps[0].id,
      massage: "Created"
    } 
   }
  
}
