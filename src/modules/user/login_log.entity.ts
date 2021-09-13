import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm'; 

@Entity({
  name: 'login_log',
})
export class LoginLog {
  @PrimaryGeneratedColumn()
  login_id: number;

  @Column()
  user_id: number;

  @Column({ type: 'double' })
  login_time: number;
}

export class LoginFillableFields {
  user_id: number;
  login_time: string;
}
