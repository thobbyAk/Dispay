import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Member } from 'src/member/member.model';
import { Club } from './club.model';
import { UpdateClubDto } from './dto';

@Injectable()
export class ClubService {
  constructor(@InjectModel('Club') private readonly clubModel: Model<Club>) {}

  async create(club): Promise<Club> {
    const createClub = new this.clubModel(club);
    return createClub.save();
  }

  async findOne(query): Promise<Club> {
    return this.clubModel.findOne(query).populate("members");
  }

  async findAll(): Promise<Club[]> {
    return this.clubModel.find().exec();
  }

  async update(clubId, updateData: UpdateClubDto): Promise<Club> {
    return this.clubModel.findByIdAndUpdate({ _id: clubId }, updateData, { new: true })
  }

  async addMember(clubId, member: Member): Promise<Club> {
    return this.clubModel.findByIdAndUpdate(
      clubId,
      { $addToSet: { members: member._id } },
      { new: true, useFindAndModify: false }
    );
  }
}

