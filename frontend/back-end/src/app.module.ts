import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClubModule } from './club/club.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { MemberModule } from './member/member.module';
import { InvitationModule } from './invitation/invitation.module';
ConfigModule.forRoot();

@Module({
  imports: [
    ClubModule,
    MongooseModule.forRoot(`mongodb+srv://${process.env.MONGO_ATLAS_USER}:${process.env.MONGO_ATLAS_PASSWORD}@display-cluster.awcah.mongodb.net/${process.env.MONGO_ATLAS_DB}?retryWrites=true&w=majority`),
    MemberModule,
    InvitationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor() { }
}
