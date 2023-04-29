import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BoardModule } from './board/board.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from './config/typeorm.config';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    BoardModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfig }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
