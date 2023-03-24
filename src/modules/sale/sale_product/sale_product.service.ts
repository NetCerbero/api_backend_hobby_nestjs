import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { MessageException } from 'src/core/exception/messageException';
import { DatabaseConfig } from 'src/database/databse.config';
import { BusinessBranchRepository } from 'src/modules/business/business_branch/repository/business_branch.repository';
import { IUserAuthSession } from 'src/modules/user/user_auth/interface/user_auth_session.interface';
import { EntityManager } from 'typeorm';
import { SaleCategoryRepository } from '../sale_category/repository/sale_category.repository';
import { CreateSaleProductDto } from './dto/create-sale_product.dto';
import { UpdateSaleProductDto } from './dto/update-sale_product.dto';
import { SaleProductEntity } from './entities/sale_product.entity';
import { SaleProductBranchEntity } from './entities/sale_product_branch.entity';
import { SaleProductRepository } from './repository/sale_product.repository';
import { SaleProductBranchRepository } from './repository/sale_product_branch.repository';

@Injectable()
export class SaleProductService {
  constructor(
    @Inject(SaleProductRepository)
    private readonly saleProduct: SaleProductRepository,

    @Inject(SaleProductBranchRepository)
    private readonly saleProductBranch: SaleProductBranchRepository,

    @Inject(BusinessBranchRepository)
    private readonly businessBranch: BusinessBranchRepository,

    @Inject(SaleCategoryRepository)
    private readonly categoryProduct: SaleCategoryRepository,
  ) {}

  async create(
    createSaleProductDto: CreateSaleProductDto,
    auth: IUserAuthSession,
  ) {
    const transaction =
      await this.saleProduct.manager.connection.createQueryRunner();
    await transaction.startTransaction(DatabaseConfig.TRANSACTION.SERIALIZABLE);
    let error;
    try {
      const { avaibleInBranch, ...product } = createSaleProductDto;
      const belongsTo = await this.businessBranch.belongsToBusinessTransaction(
        transaction.manager,
        avaibleInBranch.map((v) => v.branchId),
        auth.tenantId,
      );
      if (!belongsTo)
        throw new ConflictException(
          'Ups!, algunas sucursales no se encuentran disponibles.',
        );
      const categoryBelongsTo =
        await this.categoryProduct.belongsToBusinessTransaction(
          transaction.manager,
          [product.categoryId],
          auth.tenantId,
        );
      if (!categoryBelongsTo)
        throw new ConflictException(
          'Ups!, la categoria no se encuentra disponible.',
        );

      if (product.sku) {
        const productSku = await this.saleProduct.getBySkuBusinessTransaction(
          transaction.manager,
          product.sku,
          auth.tenantId,
        );
        if (productSku)
          throw new ConflictException(
            `Ups!, ${product.sku} ya se encuentra en uso.`,
          );
      }

      const productSave = await this.saleProduct.saveTransaction(
        transaction.manager,
        { ...product, businessId: auth.tenantId },
      );
      await this.saleProductBranch.saveTransaction(
        transaction.manager,
        avaibleInBranch.map((v) => ({ ...v, productId: productSave?.id })),
      );
      await transaction.commitTransaction();
    } catch (err) {
      // since we have errors lets rollback the changes we made
      await transaction.rollbackTransaction();
      error = err;
    } finally {
      // you need to release a queryRunner which was manually instantiated
      await transaction.release();
    }
    if (error instanceof ConflictException) throw error;
    if (error) throw new ConflictException(MessageException.NOT_SAVE);
  }

  async findAll(auth: IUserAuthSession) {
    return await this.saleProduct.getAllWithRelByBusiness(auth.tenantId);
  }

  async findOne(id: number, auth: IUserAuthSession) {
    const find = await this.saleProduct.getOneWithRelByBusiness(
      id,
      auth.tenantId,
    );
    if (!find) throw new NotFoundException(MessageException.NOT_FOUND);
    return find;
  }

  async update(
    id: number,
    updateSaleProductDto: UpdateSaleProductDto,
    auth: IUserAuthSession,
  ) {
    const transaction =
      await this.saleProduct.manager.connection.createQueryRunner();
    await transaction.startTransaction(DatabaseConfig.TRANSACTION.SERIALIZABLE);
    let error;
    try {
      const { avaibleInBranch, ...product } = updateSaleProductDto;
      const productBelongsTo =
        await this.saleProduct.belongsToBusinessTransaction(
          transaction.manager,
          [id],
          auth.tenantId,
        );
      if (!productBelongsTo)
        throw new ConflictException(
          'Ups!, el producto no se encuentra disponible.',
        );

      const branchesBelongsTo =
        await this.businessBranch.belongsToBusinessTransaction(
          transaction.manager,
          avaibleInBranch.map((v) => v.branchId),
          auth.tenantId,
        );
      if (!branchesBelongsTo)
        throw new ConflictException(
          'Ups!, algunas sucursales no se encuentran disponibles.',
        );

      const categoryBelongsTo =
        await this.categoryProduct.belongsToBusinessTransaction(
          transaction.manager,
          [product.categoryId],
          auth.tenantId,
        );
      if (!categoryBelongsTo)
        throw new ConflictException(
          'Ups!, la categoria no se encuentra disponible.',
        );

      if (product.sku) {
        const productSku = await this.saleProduct.getBySkuBusinessTransaction(
          transaction.manager,
          product.sku,
          auth.tenantId,
        );

        if (productSku && Number(productSku.id) !== id)
          throw new ConflictException(
            `Ups!, ${product.sku} ya se encuentra en uso.`,
          );
      }

      await this.saleProduct.updateTransaction(
        transaction.manager,
        id,
        product,
      );

      for (
        let index = 0, length = avaibleInBranch.length;
        index < length;
        index++
      ) {
        const productBranch = avaibleInBranch[index];
        const findItem =
          await this.saleProductBranch.getOneByBranchAndProductTransaction(
            transaction.manager,
            productBranch.branchId,
            id,
          );
        if (findItem)
          await this.saleProductBranch.updateTransaction(
            transaction.manager,
            findItem.id,
            productBranch,
          );
        else
          await this.saleProductBranch.saveTransaction(transaction.manager, {
            ...productBranch,
            productId: id,
          });
      }
      await transaction.commitTransaction();
    } catch (err) {
      // since we have errors lets rollback the changes we made
      await transaction.rollbackTransaction();
      error = err;
    } finally {
      // you need to release a queryRunner which was manually instantiated
      await transaction.release();
    }
    if (error instanceof ConflictException) throw error;
    if (error) throw new ConflictException(MessageException.NOT_UPDATE);
  }

  async remove(id: number, auth: IUserAuthSession) {
    const productBelongsTo = await this.saleProduct.belongsToBusiness(
      [id],
      auth.tenantId,
    );
    if (!productBelongsTo)
      throw new ConflictException(
        'Ups!, el producto no se encuentra disponible.',
      );

    await this.saleProduct.softDelete(id);
  }
}
