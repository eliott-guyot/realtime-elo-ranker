import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class PlayerEntity {
  @PrimaryColumn()
  id: string;

  @Column({ default: 0 })
  rank: number;
}
