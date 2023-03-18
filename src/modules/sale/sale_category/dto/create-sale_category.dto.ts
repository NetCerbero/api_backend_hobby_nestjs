import { IsBoolean, IsDefined, IsNumber, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateSaleCategoryDto {
    @IsDefined()
    @IsString()
    @MaxLength(100)
    name:string;

    @IsOptional()
    @IsNumber()
    order?:number;
    
    @IsOptional()
    @IsNumber()
    parentId?:number;
    
    @IsOptional()
    @IsBoolean()
    isActive?:boolean
}
