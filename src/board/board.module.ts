import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from 'src/database/board.entity';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';
import { BoardRepository } from './board.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Board])],
  controllers: [BoardController],
  providers: [BoardService, BoardRepository],
})
export class BoardModule {}
