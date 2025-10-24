import mongoose, { Document, Schema } from 'mongoose';

export interface IDashboard extends Document {
  userId: mongoose.Types.ObjectId;
  totalUsers: number;
  totalRevenue: number;
  totalOrders: number;
  monthlyGrowth: number;
  topProducts: Array<{
    name: string;
    sales: number;
    revenue: number;
  }>;
  recentActivity: Array<{
    type: string;
    description: string;
    timestamp: Date;
  }>;
  createdAt: Date;
  updatedAt: Date;
}

const dashboardSchema = new Schema<IDashboard>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  totalUsers: {
    type: Number,
    default: 0,
    min: 0
  },
  totalRevenue: {
    type: Number,
    default: 0,
    min: 0
  },
  totalOrders: {
    type: Number,
    default: 0,
    min: 0
  },
  monthlyGrowth: {
    type: Number,
    default: 0,
    min: -100,
    max: 1000
  },
  topProducts: [{
    name: {
      type: String,
      required: true,
      trim: true
    },
    sales: {
      type: Number,
      required: true,
      min: 0
    },
    revenue: {
      type: Number,
      required: true,
      min: 0
    }
  }],
  recentActivity: [{
    type: {
      type: String,
      required: true,
      enum: ['user_registration', 'order_placed', 'payment_received', 'product_added', 'system_update']
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    timestamp: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true
});

// Index for better query performance
dashboardSchema.index({ userId: 1 });
dashboardSchema.index({ createdAt: -1 });

export default mongoose.model<IDashboard>('Dashboard', dashboardSchema);
