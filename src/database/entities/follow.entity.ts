import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseEntity } from '../../common/entities/base.entities';
import { TableNameEnum } from '../../common/enums/table.name.enum';
import { UserEntity } from './user.entity';

@Entity(TableNameEnum.FOLLOWS)
export class FollowEntity extends BaseEntity {
  @Column()
  follower_id: string;
  @ManyToOne(() => UserEntity, (entity) => entity.followers)
  @JoinColumn({ name: 'follower_id' })
  follower?: UserEntity;

  @Column()
  following_id: string;
  @ManyToOne(() => UserEntity, (entity) => entity.followings)
  @JoinColumn({ name: 'following_id' })
  following?: UserEntity;
}
