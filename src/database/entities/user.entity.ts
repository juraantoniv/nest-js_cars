import { Column, Entity, OneToMany, OneToOne } from 'typeorm';

import { BaseEntity } from '../../common/entities/base.entities';
import { AddressEntity } from './adress.entity';
import { ArticleEntity } from './article.entity';
import { CommentEntity } from './comment.entity';
import { FollowEntity } from './follow.entity';
import { LikeEntity } from './like.entity';
import { RefreshTokenEntity } from './refresh.token.entity';

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

  @OneToMany(() => ArticleEntity, (entity) => entity.user)
  articles?: ArticleEntity[];

  @OneToMany(() => RefreshTokenEntity, (entity) => entity.user)
  refreshTokens?: RefreshTokenEntity[];

  @OneToOne(() => AddressEntity, (entity) => entity.user)
  address?: AddressEntity;

  @OneToMany(() => LikeEntity, (entity) => entity.user)
  likes?: LikeEntity[];

  @OneToMany(() => CommentEntity, (entity) => entity.user)
  comments?: CommentEntity[];

  @OneToMany(() => FollowEntity, (entity) => entity.follower)
  followers?: CommentEntity[];

  @OneToMany(() => FollowEntity, (entity) => entity.following)
  followings?: FollowEntity[];
}
