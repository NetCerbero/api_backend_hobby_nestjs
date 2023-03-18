import { plainToClass, Transform, Type } from "class-transformer";
import { IsArray, IsBoolean, IsDefined, IsEmail, IsNumber, IsString, MaxLength, ValidateNested } from "class-validator";
import { UserAccountStatus } from "../entities/user_account.entity";

export class CreateUserAccountDto {
    @IsDefined()
    @IsEmail()
    @MaxLength(150)
    email: string;

    @IsDefined()
    @IsString()
    @MaxLength(255)
    password: string;

    @IsDefined()
    @IsString()
    @MaxLength(100)
    displayName: string;

    @IsDefined()
    @IsString()
    @MaxLength(10)
    status: UserAccountStatus;

    @IsDefined()
    @ValidateNested({ each: true })
    @Transform(({ value }) => plainToClass(BusinessUserAccountRelationDto, value))
    @Type(() => BusinessUserAccountRelationDto)
    @IsArray()
    business: BusinessUserAccountRelationDto[];

    @IsDefined()
    @ValidateNested({ each: true })
    @Transform(({ value }) => plainToClass(BranchUserAccountRelationDto, value))
    @Type(() => BranchUserAccountRelationDto)
    @IsArray()
    branches: BranchUserAccountRelationDto[]
}

export class BusinessUserAccountRelationDto {
    @IsDefined()
    @IsNumber()
    businessProfileId: number;

    @IsDefined()
    @IsBoolean()
    default: boolean;
}

export class BranchUserAccountRelationDto {
    @IsDefined()
    @IsNumber()
    businessBranchId: number;

    @IsDefined()
    @IsBoolean()
    default: boolean
}
