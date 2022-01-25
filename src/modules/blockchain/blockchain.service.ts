import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Contract } from 'web3-eth-contract';
import { AbiItem } from 'web3-utils';
import Web3Instance from 'web3';
import { Block } from 'web3-eth';
import {
  BlockNotFoundError,
  GroupNotFoundError,
  IndexNotFoundError,
} from '@modules/blockchain/blockchain.errors';
import GroupDto from '@modules/blockchain/dto/group.dto';
import BlockchainMapper from '@modules/blockchain/blockchain.mapper';
import IndexDto from '@modules/blockchain/dto/index.dto';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const Web3 = require('web3');

@Injectable()
export default class BlockchainService implements OnModuleInit {
  private web3!: Web3Instance;

  private contract!: Contract;

  constructor(private readonly configService: ConfigService) {}

  async onModuleInit() {
    const abi: AbiItem[] = [
      {
        inputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'constructor',
      },
      {
        constant: true,
        inputs: [],
        name: 'getGroupIds',
        outputs: [{ internalType: 'uint256[]', name: '', type: 'uint256[]' }],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: true,
        inputs: [
          { internalType: 'uint256', name: '_groupId', type: 'uint256' },
        ],
        name: 'getGroup',
        outputs: [
          { internalType: 'string', name: 'name', type: 'string' },
          { internalType: 'uint256[]', name: 'indexes', type: 'uint256[]' },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: true,
        inputs: [
          { internalType: 'uint256', name: '_indexId', type: 'uint256' },
        ],
        name: 'getIndex',
        outputs: [
          { internalType: 'string', name: 'name', type: 'string' },
          { internalType: 'uint256', name: 'ethPriceInWei', type: 'uint256' },
          { internalType: 'uint256', name: 'usdPriceInCents', type: 'uint256' },
          {
            internalType: 'uint256',
            name: 'usdCapitalization',
            type: 'uint256',
          },
          { internalType: 'int256', name: 'percentageChange', type: 'int256' },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
    ];

    this.web3 = new Web3(
      this.configService.get<string>('insura.ropstenEndpoints.websockets', ''),
    );
    this.contract = new this.web3.eth.Contract(
      abi,
      this.configService.get<string>('smartContractAddress', ''),
    );
  }

  async getGroupIds(): Promise<number[]> {
    const groupIds: string[] = await this.contract.methods.getGroupIds().call();

    return groupIds.map(Number);
  }

  async getGroupById(id: number): Promise<GroupDto | GroupNotFoundError> {
    try {
      return BlockchainMapper.groupToDto(
        await this.contract.methods.getGroup(id).call(),
      );
    } catch (error) {
      Logger.error(error);
      return new GroupNotFoundError();
    }
  }

  async getIndexById(id: number): Promise<IndexDto | IndexNotFoundError> {
    try {
      return BlockchainMapper.indexToDto({
        ...(await this.contract.methods.getIndex(id).call()),
        id,
      });
    } catch (error) {
      Logger.error(error);
      return new IndexNotFoundError();
    }
  }

  async getBlock(
    blockHashOrBlockNumber: number | 'latest',
  ): Promise<Block | BlockNotFoundError> {
    try {
      return BlockchainMapper.blockToDto(
        await this.web3.eth.getBlock(blockHashOrBlockNumber),
      );
    } catch (error) {
      Logger.error(error);
      return new BlockNotFoundError();
    }
  }
}
