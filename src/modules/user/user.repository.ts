import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { UserEntity } from '../../database/entities/user.entity';
import { IUserData } from '../auth/interfaces/user-data.interface';
import { UsersListRequestDto } from './dto/request/users-list.request.dto';

@Injectable()
export class UserRepository extends Repository<UserEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(UserEntity, dataSource.manager);
  }

  public async getList(
    query: UsersListRequestDto,
    userData: IUserData,
  ): Promise<[UserEntity[], number]> {
    const qb = this.createQueryBuilder('users');
    qb.leftJoinAndSelect('users.followings', 'follows');
    qb.setParameter('myId', userData.userId);
    qb.addOrderBy('users.created', 'DESC');
    qb.take(query.limit);
    qb.skip(query.offset);
    return await qb.getManyAndCount();
  }

  public async getUser(
    query: UsersListRequestDto,
    userData: IUserData,
  ): Promise<[UserEntity[], number]> {
    const qb = this.createQueryBuilder('users');
    qb.leftJoinAndSelect(
      'users.followings',
      'follows',
      'following_id = :userID',
    );
    qb.leftJoinAndSelect('users.articles', 'articles');
    qb.setParameter('userID', userData.userId);
    qb.addOrderBy('users.created', 'DESC');
    qb.take(query.limit);
    qb.skip(query.offset);
    return await qb.getManyAndCount();
  }
}
