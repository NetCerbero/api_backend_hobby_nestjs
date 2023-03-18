import { IsDefined, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateBusinessProfileDto {
    @IsDefined()
    @IsString()
    @MaxLength(150)
    @IsNotEmpty()
    tradeName:string;

    @IsDefined()
    @IsString()
    @MaxLength(80)
    @IsNotEmpty()
    tenantKey:string;

}
