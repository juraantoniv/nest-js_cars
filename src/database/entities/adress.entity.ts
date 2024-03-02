import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

import { BaseEntity } from '../../common/entities/base.entities';
import { UserEntity } from './user.entity';

@Entity('address')
export class AddressEntity extends BaseEntity {
  @Column('text', { nullable: true })
  city?: string;

  @Column('text', { nullable: true })
  street: string;

  @Column('int', { select: false })
  post_code: number;

  @Column('text', { nullable: true })
  region: string;

  @Column()
  user_id: string;
  @OneToOne(() => UserEntity, (entity) => entity.address)
  @JoinColumn({ name: 'user_id' })
  user?: UserEntity;
}
