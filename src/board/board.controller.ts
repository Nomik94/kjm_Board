import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { boardDTO } from './dto/board.dto';
import { BoardService } from './board.service';
import { Board } from 'src/database/board.entity';

@Controller('api/board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Post()
  async createBoard(@Body() data: boardDTO): Promise<void> {
    await this.boardService.createBoard(data);
  }

  @Get()
  async getBoardAll(): Promise<Board[]> {
    return await this.boardService.getBoardAll();
  }

  @Get('/:id')
  async getBoardById(@Param('id') id: number) {
    const getById = await this.boardService.getBoardById(id);
    const relatedPosts = await this.boardService.getRelatedPosts(getById);

    return { getById, relatedPosts };
  }
}
