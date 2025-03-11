import { Module } from '@nestjs/common';
import { PasswordHasherService } from './services/password-hasher.service';

@Module({
    exports: [PasswordHasherService],
    providers: [PasswordHasherService],
})
export class CommonModule {}
