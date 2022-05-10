import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  BaseEntity,
} from "typeorm";
import Role from "./Role";

export interface UserI {
  id?: number;
  email?: string;
  password?: string;
  roles?: Array<Role>
}
@Entity("user")
class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @ManyToMany((type) => Role, (role) => role.users, {
    onDelete: "CASCADE",
  })
  @JoinTable({ name: "user_roles" })
  roles: Role[];
}

export default User;
