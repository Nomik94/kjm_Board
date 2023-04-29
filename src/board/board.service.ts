import { Injectable } from '@nestjs/common';
import { boardDTO } from './dto/board.dto';
import { BoardRepository } from './board.repository';
import { Board } from 'src/database/board.entity';
import { relatedPostDTO } from './dto/relatedPost.dto';

@Injectable()
export class BoardService {
  constructor(private readonly postRepository: BoardRepository) {}

  async createBoard(data: boardDTO): Promise<void> {
    const title = data.title;
    const content = data.content;

    await this.postRepository.save({ title, content });
  }

  async getBoardAll(): Promise<Board[]> {
    return await this.postRepository.find({
      select: { title: true, createdAt: true },
    });
  }

  async getBoardById(id: number): Promise<Board> {
    return await this.postRepository.findOne({ where: { id } });
  }

  async getRelatedPosts(data): Promise<Board[]> {
    const allPosts = await this.postRepository.find();
    const [standardPost] = allPosts.filter((p) => p.id === data.id);
    const filterPosts = allPosts.filter((p) => p.id !== data.id);
    const wordFrequency = await this.calculateWordFrequency(allPosts);

    const relatedPosts = filterPosts.filter((filterPost) => {
      const mappingPostWords = filterPost.content
        .split(' ')
        .map((word) => word.toLowerCase());
      const filterPostWords = mappingPostWords.filter((word) => {
        return wordFrequency[word] < 0.6;
      });
      if (filterPostWords) {
        const minFilterPostWords = mappingPostWords.filter((word) => {
          return wordFrequency[word] < 0.4;
        });

        const standard = standardPost.content.split(' ');
        const equalWords = [];
        for (let i = 0; i < standard.length; i++) {
          for (let j = 0; j < standard.length; j++) {
            if (standard[i] === minFilterPostWords[j]) {
              equalWords.push(standard[i]);
            }
          }
        }
        if (equalWords.length >= 2) {
          return equalWords;
        }
      }
    });

    return relatedPosts;
  }

  async calculateWordFrequency(data: relatedPostDTO[]): Promise<object> {
    const wordCount = {};
    const totalPosts = data.length;

    for (const post of data) {
      const words = post.content.split(' ').map((word) => word.toLowerCase());

      const uniqueWords = [...new Set(words)];

      for (const word of uniqueWords) {
        wordCount[word] = (wordCount[word] || 0) + 1;
      }
    }

    const wordFrequency = {};
    for (const word in wordCount) {
      wordFrequency[word] = wordCount[word] / totalPosts;
    }

    return wordFrequency;
  }
}
