import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 255, unique: true })
    email: string;

    @Column({ type: 'varchar', length: 255})
    password: string;

    @Column({ type: 'varchar', length: 255 })
    fullName: string;

    @Column({ type: 'boolean', default: true})
    isActive: boolean;

    @Column({ type: 'varchar', array: true, default: ['user'] })
    roles: string[];

}
