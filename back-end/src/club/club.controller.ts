import {
    Controller,
    Post,
    Body,
    HttpException,
    Query,
    Get,
    HttpStatus,
    Param,
    Patch,
    Delete,
  } from '@nestjs/common';
import { ClubService } from 'src/club/club.service';
import { MemberService } from 'src/member/member.service';
import { CreateMemberDto } from 'src/member/dto';
import { CreateClubDto, UpdateClubDto } from './dto';
import { Member } from 'src/member/member.model';

  
  @Controller('clubs')
  export class ClubController {
    constructor(
      private readonly memberService: MemberService,
      private readonly clubService: ClubService) {}
  
    @Post()
    async create(@Body() createClubDto: CreateClubDto): Promise<any> {
      return await this.clubService.create(createClubDto);
    }

    @Post(':clubId/members')
    async addMember(@Param('clubId') clubId: string, @Body() createMemberDto: CreateMemberDto): Promise<any> {
      let memberToAdd :Member;
      const clubExist = await this.clubService.findOne({ "_id": clubId });
      if(!clubExist) throw new HttpException({ status: HttpStatus.NOT_FOUND, error: 'Club not found' }, HttpStatus.NOT_FOUND);
      memberToAdd = await this.memberService.findOne({ walletAddress : createMemberDto.walletAddress });
      if(!memberToAdd) memberToAdd = await this.memberService.create(createMemberDto);
      return await this.clubService.addMember(clubId, memberToAdd);
    }

    @Get()
    async getAll(): Promise<any> {
      return await this.clubService.findAll();
    }

    @Patch(':clubId')
    async update(@Param('clubId') clubId: string, @Body() updateData: UpdateClubDto): Promise<any> {
      const clubExist = await this.clubService.findOne({ "_id": clubId });
      if(!clubExist) throw new HttpException({ status: HttpStatus.NOT_FOUND, error: 'Club not found' }, HttpStatus.NOT_FOUND)
      return await this.clubService.update(clubId, updateData);
    }

    @Get(':clubId')
    async getOne(@Param('clubId') clubId): Promise<any> {
      const club = await this.clubService.findOne( { "_id": clubId });
      if(!club) throw new HttpException({ status: HttpStatus.NOT_FOUND, error: 'Club not found' }, HttpStatus.NOT_FOUND)
      return club
    }
 
  }
  