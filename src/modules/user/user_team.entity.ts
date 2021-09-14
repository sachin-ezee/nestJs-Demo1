import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm'; 

@Entity({
  name: 'user_team',
})
export class UserTeams {
  @PrimaryGeneratedColumn()
  team_id: number;

  @Column()
  user_id1: number;

  @Column()
  user_id2: number;

  @Column({ length: 100 })
  team_name: string;
}

 
