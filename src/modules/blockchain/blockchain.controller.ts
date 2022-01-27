import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import BlockchainService from '@modules/blockchain/blockchain.service';
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
} from '@nestjs/swagger';
import GroupDto from '@modules/blockchain/dto/group.dto';
import IndexDto from '@modules/blockchain/dto/index.dto';
import BlockDto from '@modules/blockchain/dto/block.dto';

@ApiInternalServerErrorResponse()
@Controller()
export default class BlockchainController {
  constructor(private readonly blockchainService: BlockchainService) {}

  @ApiOkResponse({ type: Number, isArray: true })
  @Get('groups')
  getGroupIds(): Promise<number[]> {
    return this.blockchainService.getGroupIds();
  }

  @ApiOkResponse({ type: GroupDto })
  @ApiNotFoundResponse({ type: String })
  @Get('groups/:groupId')
  getGroup(@Param('groupId', ParseIntPipe) groupId: number): Promise<GroupDto> {
    return this.blockchainService.getGroupById(groupId);
  }

  @ApiOkResponse({ type: IndexDto })
  @ApiNotFoundResponse({ type: String })
  @Get('indexes/:indexId')
  getIndex(
    @Param('indexId', ParseIntPipe) indexId: number,
  ): Promise<IndexDto | never> {
    return this.blockchainService.getIndexById(indexId);
  }

  @ApiOkResponse({ type: BlockDto })
  @ApiNotFoundResponse({ type: String })
  @ApiParam({
    name: 'blockId',
    schema: {
      oneOf: [
        {
          type: 'number',
        },
        { type: 'string' },
      ],
    },
  })
  @Get('blocks/:blockId')
  getBlock(@Param('blockId') blockId: number | 'latest'): Promise<BlockDto> {
    return this.blockchainService.getBlock(blockId);
  }
}
