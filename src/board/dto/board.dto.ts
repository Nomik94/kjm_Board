import { IsString } from 'class-validator';

export class boardDTO {
  @IsString()
  title: string;

  @IsString()
  content: string;
}
