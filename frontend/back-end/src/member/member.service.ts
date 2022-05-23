import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateMemberDto } from './dto';
import { Member } from './member.model';
import { Model } from 'mongoose';

@Injectable()
export class MemberService {
    constructor(@InjectModel('Member') private readonly memberModel: Model<Member>) {}

    async create(member: CreateMemberDto): Promise<Member> {
        const createMember = new this.memberModel(member);
        return createMember.save();
      }

      async findOne(query): Promise<Member> {
        return this.memberModel.findOne(query);
    }

}
