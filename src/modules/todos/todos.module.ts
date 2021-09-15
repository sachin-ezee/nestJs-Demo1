import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';
import { Todo } from './todos.entity';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [TypeOrmModule.forFeature([Todo]), PassportModule.register({ defaultStrategy: 'jwt' }),],
    controllers: [TodosController],
    providers: [TodosService],
  })
  export class TodosModule {}