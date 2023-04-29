import { Injectable } from '@nestjs/common';
import { Board } from 'src/database/board.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class BoardRepository extends Repository<Board> {
  constructor(private dataSource: DataSource) {
    super(Board, dataSource.createEntityManager());
  }
}
