import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateBrandDto {
  @IsOptional()
  @IsNumber()
  @ApiProperty()
  id?: number;

  @IsOptional()
  @IsString()
  @ApiProperty()
  name?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  description?: string;
}

export class UpdateBrandDto extends PartialType(CreateBrandDto) {}
