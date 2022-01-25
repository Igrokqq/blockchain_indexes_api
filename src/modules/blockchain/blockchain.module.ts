import { Module } from '@nestjs/common';
import BlockchainController from '@modules/blockchain/blockchain.controller';
import BlockchainService from '@modules/blockchain/blockchain.service';

@Module({
  controllers: [BlockchainController],
  providers: [BlockchainService],
  exports: [BlockchainService],
})
export default class BlockchainModule {}
