import { Expose } from "class-transformer";


export class CreateUserResponseDto {
    
    @Expose()
    email: string;

    @Expose()
    fullName: string;
}