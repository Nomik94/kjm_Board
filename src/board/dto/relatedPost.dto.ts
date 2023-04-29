import { IsNumber, IsString } from 'class-validator';

export class relatedPostDTO {
  @IsNumber()
  id: number;

  @IsString()
  title: string;

  @IsString()
  content: string;
}
