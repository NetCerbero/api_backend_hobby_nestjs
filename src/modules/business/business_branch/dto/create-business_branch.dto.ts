import { IsDefined, IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";

export class CreateBusinessBranchDto {
    @IsDefined()
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    name:string;

    @IsDefined()
    @IsString()
    @IsNotEmpty()
    @MaxLength(200)
    address:string;

    @IsDefined()
    @IsNotEmpty()
    @IsNumber()
    locationId:number;

    @IsDefined()
    @IsNotEmpty()
    @IsNumber()
    businessId:number;
}
