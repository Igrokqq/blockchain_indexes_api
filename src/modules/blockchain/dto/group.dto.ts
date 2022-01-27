import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

export default class GroupDto {
  @ApiProperty()
  @Expose()
  readonly name: string = '';

  @ApiProperty({ type: Number, isArray: true })
  @Expose()
  @Type(() => Number)
  readonly indexes: number[] = [];
}
