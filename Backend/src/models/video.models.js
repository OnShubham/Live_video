import mongoose, { Schema } from 'mongoose';


import aggregatePaginate from "mongoose-aggregate-paginate-v2"


const videoSchema = new Schema(
  {
    videoFile: {
      type: String,
      require: true,
    },
    thumbnail: {
      type: String,
      require: true,
    },
    title: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    duration: {
      type: Number,
      require: true,
    },
    duration: {
      type: Number,

      default: 0,
    },
    isPublished: {
      type: Boolean,
      require: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);


videoSchema.plugin(aggregatePaginate)

export const Video = mongoose.model('Video', videoSchema);
