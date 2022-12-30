import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './modules/usuario/usuario.module';
import { UbicacionModule } from './modules/ubicacion/ubicacion.module';
import { ArticuloModule } from './modules/articulo/articulo.module';
import { CategoriaModule } from './modules/categoria/categoria.module';
import { VentaModule } from './modules/venta/venta.module';

@Module({
  imports: [UsuarioModule, UbicacionModule, ArticuloModule, CategoriaModule, VentaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
