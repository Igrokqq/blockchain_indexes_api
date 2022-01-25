import { plainToInstance } from 'class-transformer';
import BlockDto from '@modules/blockchain/dto/block.dto';
import GroupDto from '@modules/blockchain/dto/group.dto';
import IndexDto from '@modules/blockchain/dto/index.dto';

export default class BlockchainMapper {
  static groupToDto(group: Record<string, any>): GroupDto {
    return plainToInstance(GroupDto, group, {
      excludeExtraneousValues: true,
    });
  }

  static indexToDto(index: Record<string, any>): IndexDto {
    return plainToInstance(IndexDto, index, {
      excludeExtraneousValues: true,
    });
  }

  static blockToDto(block: Record<string, any>): BlockDto {
    return plainToInstance(BlockDto, block, {
      excludeExtraneousValues: true,
    });
  }
}
