import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { CreateUserAccountDto } from './dto/create-user_account.dto';
import { UpdateUserAccountDto } from './dto/update-user_account.dto';
import { UserAccountRepository } from './repository/user_acount.repository';
import { genSalt, hash } from 'bcryptjs';
import { MessageException, MessageExceptionTransform } from 'src/core/exception/messageException';
import { UserBusinessBranchRepository } from './repository/user_business_branch.repository';
import { UserBusinessProfileRepository } from './repository/user_business_profile_repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserAccountService {
  constructor(
    @Inject(UserAccountRepository)
    private readonly userAccount: UserAccountRepository,

    @Inject(UserBusinessBranchRepository)
    private readonly userBranch: UserBusinessBranchRepository,

    @Inject(UserBusinessProfileRepository)
    private readonly userBusiness: UserBusinessProfileRepository
  ) { }

  async create({ business, branches, email, ...createUserAccountDto }: CreateUserAccountDto) {
    const findOne = await this.userAccount.getByEmail(email);
    if (findOne) {
      throw new ConflictException(MessageExceptionTransform(MessageException.DUPLICATE, email));
    }

    const passwordEncript = await this.textToHash(createUserAccountDto.password)
    
    const userCountSave = await this.userAccount.save({
      ...createUserAccountDto,
      email,
      password: passwordEncript
    });

    await this.userBranch.save(branches.map((b) => ({ ...b, userAccountId: userCountSave.id })));
    await this.userBusiness.save(business.map((b) => ({ ...b, userAccountId: userCountSave.id })));
  }

  async findAll() {
    return await this.userAccount.getLisWithBranchAndBusiness();
  }

  async findOne(id: number) {
    return await this.userAccount.getById(id);
  }

  async update(id: number, { password,email, business, branches, ...updateUserAccountDto }: UpdateUserAccountDto) {
    if (password) {
      updateUserAccountDto["password"] = await this.textToHash(password);
    }
    
    await this.userAccount.update(id, {
      ...updateUserAccountDto
    });

  }

  async remove(id: number) {
    return await this.userAccount.softDelete(id);
  }

  private async textToHash(txt: string) {
    const salt = await genSalt(10);
    return await hash(txt, salt);
  }

  async findUserByEmail(email:string){
    return await this.userAccount.getByEmailWithAllRel(email);
  }

  async findUserById(id:string|number){
    return await this.userAccount.getByIdWithAllRel(id)
  }
}
