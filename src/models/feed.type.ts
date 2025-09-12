interface UserFeedItem {
  user_id: string;
  actor_ids: string[] | null;
  actors: {
    id: string
    avatar_url: string
    user_name: string
  }[]
  activity_type: 'liked' | 'reviewed' | 'completed' | 'started' | 'published';
  book_id: string;
  books: {
    id: string
    title: string;
    cover_image_url: string;
    description: string
    creator_books: {
      creators: {
        alias: string;
        avatar_url: string;
      };
    }[];
  };
  created_at: string;
  updated_at: string;
  review?: string;
}

interface GroupedFeedItem {
  book: UserFeedItem['books'];
  activities: {
    actor_ids: string[] | null;
    actors: UserFeedItem['actors'];
    activity_type: UserFeedItem['activity_type'];
    created_at: string;
    updated_at: string;
    review?: string;
  }[];
};

interface BookStatsItem {
  review_count: { count: number }[];
  like_count: { count: number }[];
}

interface bookModal {
  id: string
  isVisible: boolean
}

interface LikedBookFeedEntry {
  user: {
    id: string
    name: string
    user_name: string
    avatar_url: string
  }
}

interface ReviewedBookFeedEntry {
  review: string
  created_at: string
  user: {
    id: string
    name: string
    user_name: string
    avatar_url: string
  }
}

export {
  UserFeedItem,
  GroupedFeedItem,
  BookStatsItem,
  bookModal,
  LikedBookFeedEntry,
  ReviewedBookFeedEntry
}