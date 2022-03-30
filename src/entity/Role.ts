import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import User from "./User";

@Entity("role")
class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  role: string;

  @ManyToMany((type) => User, (user) => user.roles)
  users: User[];
}

export default Role;
