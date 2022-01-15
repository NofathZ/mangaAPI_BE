import { Manga } from "src/mangas/mangas.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  _id: number

  @Column({
    unique: true
  })
  email: string

  @Column()
  password: string;
}