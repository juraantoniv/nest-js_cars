import { Column, Entity } from 'typeorm';

import { BaseEntity } from '../../common/entities/base.entities';

@Entity('usersData')
export class UserEntity extends BaseEntity {
  @Column('text', { nullable: true })
  name?: string;

  @Column('text')
  email: string;

  @Column('text', { select: false })
  password: string;

  @Column('int', { nullable: true })
  age: number;

  @Column('text', { nullable: true })
  city: string;

  @Column('text', { nullable: true, default: null })
  avatar: string;
}
