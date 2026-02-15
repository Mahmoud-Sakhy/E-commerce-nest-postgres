import { IsOptional, IsString, IsNumber, IsBoolean } from 'class-validator';

export class CreateProductDto {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsString()
  title: string;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsString()
  slug: string;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsString()
  description: string;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsNumber()
  price: number;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsOptional()
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsNumber()
  compareAtPrice?: number;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsOptional()
  colors?: string[];

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsOptional()
  sizes?: string[];

  @IsOptional()
  @IsString()
  categoryId?: string;

  @IsOptional()
  @IsString()
  brandId?: string;

  @IsOptional()
  @IsNumber()
  stock?: number;

  @IS_OPTIONAL()
  @IsBoolean()
  isAvailable?: boolean;
}
