export enum RewardType {
  PHYSICAL = 'physical',
  DIGITAL = 'digital',
  VOUCHER = 'voucher'
}

export interface Reward {
  id: string;
  title: string;
  description: string;
  type: RewardType;
  points: number;
  image: string;
  stock: number;
  maxPerUser: number;
  expiresAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface RewardRedemption {
  id: string;
  userId: string;
  rewardId: string;
  pointsSpent: number;
  status: 'pending' | 'processed' | 'shipped' | 'delivered';
  shippingAddress?: string;
  redeemedAt: Date;
}