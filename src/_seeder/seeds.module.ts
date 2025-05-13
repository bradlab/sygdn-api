import { Module } from '@nestjs/common';
import { GlobalSeed } from './global.seed';

@Module({
  imports: [],
  providers: [GlobalSeed],
})
export class SeedsModule {}
