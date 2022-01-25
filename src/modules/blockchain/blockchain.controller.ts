import {
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import BlockchainService from '@modules/blockchain/blockchain.service';
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
} from '@nestjs/swagger';
import GroupDto from '@modules/blockchain/dto/group.dto';
import {
  BlockNotFoundError,
  GroupNotFoundError,
  IndexNotFoundError,
} from '@modules/blockchain/blockchain.errors';
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
  async getGroup(
    @Param('groupId', ParseIntPipe) groupId: number,
  ): Promise<GroupDto | never> {
    const groupOrError: GroupDto | GroupNotFoundError =
      await this.blockchainService.getGroupById(groupId);

    if (groupOrError instanceof GroupNotFoundError) {
      throw new NotFoundException(groupOrError.message);
    }

    return groupOrError;
  }

  @ApiOkResponse({ type: IndexDto })
  @ApiNotFoundResponse({ type: String })
  @Get('indexes/:indexId')
  async getIndex(
    @Param('indexId', ParseIntPipe) indexId: number,
  ): Promise<IndexDto | never> {
    const indexOrError: IndexDto | IndexNotFoundError =
      await this.blockchainService.getIndexById(indexId);

    if (indexOrError instanceof IndexNotFoundError) {
      throw new NotFoundException(indexOrError.message);
    }
    return indexOrError;
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
  async getBlock(
    @Param('blockId') blockId: number | 'latest',
  ): Promise<BlockDto | never> {
    const blockOrError: BlockDto | BlockNotFoundError =
      await this.blockchainService.getBlock(blockId);

    if (blockOrError instanceof BlockNotFoundError) {
      throw new NotFoundException(blockOrError.message);
    }

    return blockOrError;
  }
}
