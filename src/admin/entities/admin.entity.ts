import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  Index,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity('admins')
export class Admin {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50, unique: true })
  @Index()
  username: string;

  @Column({ length: 100, unique: true })
  @Index()
  email: string;

  @Column({ length: 60 })
  pin: string;

  @Column({ nullable: true })
  profilePic?: string;

  @Column({ nullable: true })
  profilePicPublicId?: string;

  @Column({ default: false })
  isSuperAdmin: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPin() {
    if (this.pin) {
      const salt = await bcrypt.genSalt(10);
      this.pin = await bcrypt.hash(this.pin, salt);
    }
  }

  async comparePin(candidatePin: string): Promise<boolean> {
    return bcrypt.compare(candidatePin, this.pin);
  }
}
