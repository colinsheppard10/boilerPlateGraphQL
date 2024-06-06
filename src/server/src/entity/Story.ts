import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import {Comment} from './Comment'

@Entity()
export class Story extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @OneToMany(() => Comment, (comment) => comment.story, {
    onDelete: "CASCADE",
    nullable: true,
  })
  comments: Comment[];
}
