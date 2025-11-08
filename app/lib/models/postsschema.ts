import mongoose from "mongoose";
import { InstagramItem } from "../mongodbschameas";

const InstagramItemSchema = new mongoose.Schema<InstagramItem>({
  id: String,
  type: String,
  shortCode: String,
  caption: String,
  url: String,
  videoUrl: String,
  displayUrl: String,
  likesCount: Number,
  commentsCount: Number,
  videoViewCount: Number,
  timestamp: Date,
  ownerUsername: String,
  ownerFullName: String,
  locationName: String,
  isCommentsDisabled: Boolean,
  latestComments: [{
    id: String,
    text: String,
    ownerUsername: String,
    ownerProfilePicUrl: String,
    timestamp: Date,
    repliesCount: Number,
    replies: [{
      id: String,
      text: String,
      ownerUsername: String,
      ownerProfilePicUrl: String,
      timestamp: Date,
    }],
    owner: {
      id: String,
      username: String,
      profile_pic_url: String,
      is_verified: Boolean,
    },
}],
videoDuration: Number,
locationId: String,
productType: String,
isSponsored: Boolean,
audioUrl: String,
alt: String,
dimensionsHeight: Number,
}, { timestamps: true });

export default mongoose.models.InstagramItem ||
mongoose.model("InstagramItem", InstagramItemSchema);
