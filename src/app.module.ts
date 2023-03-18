import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { Configuration } from './config/config.keys';
import { UserAccountModule } from './modules/user/user_account/user_account.module';
import { UserGroupModule } from './modules/user/user_group/user_group.module';
import { SaleCategoryModule } from './modules/sale/sale_category/sale_category.module';
import { SaleProductModule } from './modules/sale/sale_product/sale_product.module';
import { BusinessProfileModule } from './modules/business/business_profile/business_profile.module';
import { BusinessBranchModule } from './modules/business/business_branch/business_branch.module';
import { BusinessLocationModule } from './modules/business/business_location/business_location.module';
import { UserAuthModule } from './modules/user/user_auth/user_auth.module';

@Module({
  imports: [DatabaseModule, ConfigModule, UserAccountModule, UserGroupModule, SaleCategoryModule, SaleProductModule, BusinessProfileModule, BusinessBranchModule, BusinessLocationModule, UserAuthModule],
})
export class AppModule {
  static port: number | string;
  static allowedOrigins: string[];
  constructor(readonly _config: ConfigService) {
    AppModule.port = this._config.get(Configuration.PORT_SERVER);
    AppModule.allowedOrigins = [
      ...this._config.get(Configuration.LIST_CORS).split(','),
    ];
  }
}
