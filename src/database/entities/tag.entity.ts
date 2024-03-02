import { Column, Entity, ManyToMany } from 'typeorm';

import { BaseEntity } from '../../common/entities/base.entities';
import { TableNameEnum } from '../../common/enums/table.name.enum';
import { ArticleEntity } from './article.entity';

@Entity(TableNameEnum.TAGS)
export class TagEntity extends BaseEntity {
  @Column('text')
  name: string;

  @ManyToMany(() => ArticleEntity, (entity) => entity.tags)
  articles?: ArticleEntity[];
}
