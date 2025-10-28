import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { AuthProvider, UserRole } from '../../../shared/types/user.interface';
import { UserGoal } from '../../../shared/types/goal.interface';
import { Skill } from '../../../shared/types/skill.interface';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  password?: string;

  @Prop({ required: true, enum: UserRole, default: UserRole.LEARNER })
  role: UserRole;

  @Prop()
  avatar?: string;

  @Prop({ required: true, enum: AuthProvider, default: AuthProvider.EMAIL })
  provider: AuthProvider;

  @Prop({ type: [{ type: Object }], default: [] })
  goals: UserGoal[];

  @Prop({ type: [{ type: Object }], default: [] })
  skills: Skill[];

  @Prop({ default: 0 })
  points: number;

  @Prop({ type: [String], default: [] })
  enrolledCourses: string[];

  @Prop({ type: [String], default: [] })
  completedCourses: string[];

  @Prop({ type: [String], default: [] })
  badges: string[];

  @Prop({ default: false })
  isOnboarded: boolean;

  @Prop()
  refreshToken?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);