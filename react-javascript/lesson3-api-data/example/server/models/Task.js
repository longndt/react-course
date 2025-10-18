import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
   title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100
   },
   description: {
      type: String,
      trim: true,
      maxlength: 500
   },
   status: {
      type: String,
      enum: ['pending', 'completed'],
      default: 'pending'
   },
   priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium'
   },
   dueDate: {
      type: Date
   },
   category: {
      type: String,
      trim: true,
      maxlength: 50
   }
}, {
   timestamps: true
});

export default mongoose.model('Task', taskSchema);