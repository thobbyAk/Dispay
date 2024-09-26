import { IsNumber, IsOptional, IsDefined , IsMongoId} from 'class-validator';
  
export class CreateMemberDto {
    @IsDefined()
    name: string;

    @IsDefined()
    walletAddress:String
}