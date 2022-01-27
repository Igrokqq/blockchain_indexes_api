import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import BlockchainModule from '@modules/blockchain/blockchain.module';
import BlockchainService from '@modules/blockchain/blockchain.service';
import GroupDto from './dto/group.dto';
import IndexDto from './dto/index.dto';
import BlockDto from './dto/block.dto';
import BlockTransactionDto from './dto/block-transaction.dto';

describe('Blockchain', () => {
  let app: INestApplication;
  const groupMock: GroupDto = {
    name: '',
    indexes: [],
  };
  const indexMock: IndexDto = {
    id: 1,
    name: 'adasdas',
    ethPriceInWei: 1,
    usdPriceInCents: 2,
    usdCapitalization: 3,
    percentageChange: 4,
  };
  const blockMock: BlockDto = {
    transactions: [
      {
        hash: 'string',
        nonce: 0,
        blockHash: 'string',
        blockNumber: 0,
        transactionIndex: 0,
        from: 'string',
        to: 'string',
        value: 'string',
        gasPrice: 'string',
        maxPriorityFeePerGas: 0,
        maxFeePerGas: 0,
        gas: 0,
        input: 'string',
      },
      'string',
    ] as BlockTransactionDto[],
    size: 0,
    difficulty: 0,
    totalDifficulty: 0,
    uncles: ['string'],
    number: 0,
    hash: 'string',
    parentHash: 'string',
    nonce: 'string',
    sha3Uncles: 'string',
    logsBloom: 'string',
    transactionRoot: 'string',
    stateRoot: 'string',
    receiptsRoot: 'string',
    miner: 'string',
    extraData: 'string',
    gasLimit: 0,
    gasUsed: 0,
    timestamp: 0,
    baseFeePerGas: 0,
  };

  const blockchainService = {
    getGroupIds: () => ({
      data: [1, 2, 3],
    }),
    getGroupById: (id: number) => ({
      data: groupMock,
    }),
    getIndexById: (id: number) => ({
      data: indexMock,
    }),
    getBlock: (blockHashOrBlockNumber: number | 'latest') => ({
      data: blockMock,
    }),
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [BlockchainModule],
    })
      .overrideProvider(BlockchainService)
      .useValue(blockchainService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/GET /groups`, () =>
    request(app.getHttpServer())
      .get('/groups')
      .expect(200)
      .expect(blockchainService.getGroupIds()));

  it(`/GET /groups/:groupId`, () =>
    request(app.getHttpServer())
      .get('/groups/13')
      .expect(200)
      .expect(blockchainService.getGroupById(13)));

  it(`/GET /indexes/:indexId`, () =>
    request(app.getHttpServer())
      .get('/indexes/1')
      .expect(200)
      .expect(blockchainService.getIndexById(1)));

  it(`/GET /blocks/:blockId`, () =>
    request(app.getHttpServer())
      .get('/blocks/123123')
      .expect(200)
      .expect(blockchainService.getBlock(123123)));

  afterAll(async () => {
    await app.close();
  });
});
