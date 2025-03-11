import { IsEmail, IsString, IsStrongPassword, Matches, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
    
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

    @IsString({message: 'Full name must be a string'})
    @MinLength(3, {message: 'Full name must be at least 3 characters'})
    fullName: string;
}
