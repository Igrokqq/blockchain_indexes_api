import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { Transaction } from 'web3-eth';

export default class BlockTransactionDto implements Transaction {
  @ApiProperty()
  @Expose()
  readonly hash: string;

  @ApiProperty()
  @Expose()
  readonly nonce: number;

  @ApiProperty()
  @Expose()
  readonly blockHash: string;

  @ApiProperty()
  @Expose()
  readonly blockNumber: number;

  @ApiProperty()
  @Expose()
  readonly transactionIndex: number;

  @ApiProperty()
  @Expose()
  readonly from: string;

  @ApiProperty()
  @Expose()
  readonly to: string;

  @ApiProperty()
  @Expose()
  readonly value: string;

  @ApiProperty()
  @Expose()
  @Type(() => Number)
  readonly gasPrice: string;

  @ApiProperty()
  @Expose()
  @Type(() => Number)
  readonly maxPriorityFeePerGas?: number;

  @ApiProperty()
  @Expose()
  @Type(() => Number)
  readonly maxFeePerGas?: number;

  @ApiProperty()
  @Expose()
  @Type(() => Number)
  readonly gas: number;

  @ApiProperty()
  @Expose()
  readonly input: string;
}
