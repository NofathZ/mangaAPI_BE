import { User } from "src/users/users.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('manga')
export class Manga {
  @Column({
    primary: true
  })
  _id: number

  @Column()
  title: string;

  @Column()
  canonicalTitle: string;

  @Column()
  averageRating: string;

  @Column("longtext")
  synopsis: string;
}