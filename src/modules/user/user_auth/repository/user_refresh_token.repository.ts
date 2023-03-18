import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { UserRefreshTokenEntity } from '../entities/user_refresh_token.entity';

@Injectable()
export class UserRefreshTokenRepository extends Repository<UserRefreshTokenEntity> {
  constructor(private dataSource: DataSource) {
    super(UserRefreshTokenEntity, dataSource.createEntityManager());
  }

  async getByIdAndUser(id: string, user: string) {
    return await this.createQueryBuilder()
      .select()
      .where('id = :id and user_id = :user', { id, user })
      .getOne();
  }
}
