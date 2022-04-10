import { Module } from '@nestjs/common';
import { ClubService } from './club.service';
import { ClubController } from './club.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ClubSchema } from './club.model';
import { MemberModule } from 'src/member/member.module';


@Module({
  imports: [
    MemberModule,
    MongooseModule.forFeature([{ name: 'Club', schema: ClubSchema }]),
  ],
  controllers: [ClubController],
  providers: [ClubService],
  exports:[ClubService],
})
export class ClubModule {}
