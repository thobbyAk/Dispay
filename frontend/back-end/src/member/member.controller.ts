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
import { CreateMemberDto } from './dto';
import { MemberService } from './member.service';

  
  @Controller('members')
  export class MemberController {
    constructor(private readonly memberService: MemberService) {}
  
    @Post()
    async create(@Body() createMemberDto: CreateMemberDto): Promise<any> {
      return await this.memberService.create(createMemberDto);
    }
 
  }
  