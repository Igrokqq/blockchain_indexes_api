import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

export default class IndexDto {
  @ApiProperty()
  @Expose()
  readonly id: number = 0;

  @ApiProperty()
  @Expose()
  readonly name: string = '';

  @ApiProperty()
  @Expose()
  @Type(() => Number)
  readonly ethPriceInWei: number = 1;

  @ApiProperty()
  @Expose()
  @Type(() => Number)
  readonly usdPriceInCents: number = 1;

  @ApiProperty()
  @Expose()
  @Type(() => Number)
  readonly usdCapitalization: number = 1;

  @ApiProperty()
  @Expose()
  @Type(() => Number)
  readonly percentageChange: number = 1;
}
