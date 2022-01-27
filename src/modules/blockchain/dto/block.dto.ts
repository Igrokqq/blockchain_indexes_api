import { ApiExtraModels, ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { Block } from 'web3-eth';
import BlockTransactionDto from '@modules/blockchain/dto/block-transaction.dto';

@ApiExtraModels(BlockTransactionDto)
export default class BlockDto implements Block {
  @ApiProperty({
    type: 'array',
    items: {
      oneOf: [{ $ref: getSchemaPath(BlockTransactionDto) }, { type: 'string' }],
    },
  })
  @Expose()
  readonly transactions: BlockTransactionDto[] | string[];

  @ApiProperty()
  @Expose()
  readonly size: number;

  @ApiProperty()
  @Expose()
  readonly difficulty: number;

  @ApiProperty()
  @Expose()
  readonly totalDifficulty: number;

  @ApiProperty()
  @Expose()
  readonly uncles: string[];

  @ApiProperty()
  @Expose()
  readonly number: number;

  @ApiProperty()
  @Expose()
  readonly hash: string;

  @ApiProperty()
  @Expose()
  readonly parentHash: string;

  @ApiProperty()
  @Expose()
  readonly nonce: string;

  @ApiProperty()
  @Expose()
  readonly sha3Uncles: string;

  @ApiProperty()
  @Expose()
  readonly logsBloom: string;

  @ApiProperty()
  @Expose()
  readonly transactionRoot: string;

  @ApiProperty()
  @Expose()
  readonly stateRoot: string;

  @ApiProperty()
  @Expose()
  readonly receiptsRoot: string;

  @ApiProperty()
  @Expose()
  readonly miner: string;

  @ApiProperty()
  @Expose()
  readonly extraData: string;

  @ApiProperty()
  @Expose()
  readonly gasLimit: number;

  @ApiProperty()
  @Expose()
  readonly gasUsed: number;

  @ApiProperty()
  @Expose()
  @Type(() => Number)
  readonly timestamp: number;

  @ApiProperty()
  @Expose()
  @Type(() => Number)
  readonly baseFeePerGas?: number;
}
