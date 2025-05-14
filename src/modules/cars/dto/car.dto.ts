import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Min,
  MinLength,
} from 'class-validator';

export class CreateCarDto {
  @IsOptional()
  @IsNumber()
  @ApiProperty()
  id?: number;

  @IsString()
  @MinLength(3)
  @IsOptional()
  @ApiProperty()
  model?: string;

  @IsString()
  @MinLength(3)
  @ApiProperty()
  description: string;

  @IsInt()
  @IsPositive()
  @ApiProperty()
  year?: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  @ApiProperty()
  stock?: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  @ApiProperty()
  price?: number;

  @IsOptional()
  @ApiProperty()
  isAvailable?: boolean;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  @IsNotEmpty()
  readonly brand_id: number;
}

export class UpdateCarDto extends PartialType(CreateCarDto) {}

export class FilterCarDto {
  @IsOptional()
  @IsPositive()
  limit: number;

  @IsOptional()
  @Min(0)
  offset: number;

  @IsOptional()
  description: string;
}
