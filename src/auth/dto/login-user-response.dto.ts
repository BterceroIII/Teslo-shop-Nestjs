import { Expose } from "class-transformer";


export class LoginUserResponseDto {
    
    @Expose()
    email: string;

    @Expose()
    password: string;

    @Expose()
    fullName: string;

}