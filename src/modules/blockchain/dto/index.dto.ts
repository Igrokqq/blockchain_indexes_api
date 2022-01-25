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
  readonly ethPriceInWei: string = '';

  @ApiProperty()
  @Expose()
  @Type(() => Number)
  readonly usdPriceInCents: string = '';

  @ApiProperty()
  @Expose()
  @Type(() => Number)
  readonly usdCapitalization: string = '';

  @ApiProperty()
  @Expose()
  @Type(() => Number)
  readonly percentageChange: string = '';
}
