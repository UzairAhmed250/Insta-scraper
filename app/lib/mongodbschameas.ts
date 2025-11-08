export interface InstagramItem {
    _id: string;
    id: string;
    type: 'Video' | 'Story' | 'Reel' | 'Image';
    shortCode: string;
    caption: string;
    url: string;
    videoUrl: string;
    displayUrl: string;
    likesCount: number;
    commentsCount: number;
    videoViewCount: number;
    timestamp: Date;
    ownerUsername: string;
    ownerFullName: string;
    locationName: string;
    isCommentsDisabled: boolean;
    latestComments: {
        id: string;
        text: string;
        ownerUsername: string;
        ownerProfilePicUrl: string;
        timestamp: Date;
        repliesCount: number;
        replies: {
            id: string;
            text: string;
            ownerUsername: string;
            ownerProfilePicUrl: string;
            timestamp: Date;
        }[];
    }[];
    owner: {
        id: string;
        username: string;
        profile_pic_url: string;
        is_verified: boolean;
    };
    videoDuration: number;
    locationId: string;
    productType: string;
    isSponsored: boolean;
    audioUrl: string;
    alt: string;
    dimensionsHeight: number;
}
