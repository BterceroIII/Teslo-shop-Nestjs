import { IsEmail, IsString, IsStrongPassword } from "class-validator";

export class LoginUserDto {
    
    @IsString({message: 'Email must be a string'})
    @IsEmail({}, {message: 'Email must be a valid email'})
    email: string;

    @IsStrongPassword({
        minLength: 6,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 0,
    })
    password: string;
}