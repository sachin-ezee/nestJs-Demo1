import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm'; 

@Entity({
  name: 'todos',
})
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ default: false })
  is_done: Boolean;

  @Column({ type: 'double' })
  create_at: number;

  @Column({ type: 'double' })
  updated_at: number;
}

export class TodosFillableFields {
  title: string;
  description: string;
  is_done: boolean;
}
