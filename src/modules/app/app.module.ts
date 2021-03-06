import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import AppController from '@modules/app/app.controller';
import AppService from '@modules/app/app.service';
import BlockchainModule from '@modules/blockchain/blockchain.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), BlockchainModule],
  controllers: [AppController],
  providers: [AppService],
})
export default class AppModule {}
