import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm'; 

@Entity({
  name: 'images',
})
export class Images {
  @PrimaryGeneratedColumn()
  imageId: number;

  @Column()
  imageName: string;

  @Column()
  imageUrl: string;
  
  @Column({ type: 'double' })
  create_at: number;

  @Column({ type: 'double' })
  updated_at: number;
}

export class ImagesFillableFields {
  imageName: string;
  imageUrl: string;
}
 
