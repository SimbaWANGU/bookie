import { Achievement, TierBadge } from "@models/achievement.type";

const achievementTimeThresholds: Achievement[] = [
  { key: 'time_60', threshold: 60, title: 'Starting Out!', description: 'Read for 1 minute', rarity: 'Common' },
  { key: 'time_600', threshold: 600, title: 'Good Habit!', description: 'Read for 10 minutes', rarity: 'Common' },
  { key: 'time_1800', threshold: 1800, title: 'Dedicated Reader!', description: 'Read for 30 minutes', rarity: 'Common' },
  { key: 'time_3600', threshold: 3600, title: 'Book Worm!', description: 'Read for 1 hour', rarity: 'Uncommon' },
  { key: 'time_7200', threshold: 7200, title: 'Literary Aficionado!', description: 'Read for 2 hours', rarity: 'Uncommon' },
  { key: 'time_18000', threshold: 18000, title: 'Literary Devourer!', description: 'Read for 5 hours', rarity: 'Rare' },
  { key: 'time_36000', threshold: 36000, title: 'Reading Enthusiast!', description: 'Read for 10 hours', rarity: 'Rare' },
  { key: 'time_72000', threshold: 72000, title: 'Literary Apprentice!', description: 'Read for 20 hours', rarity: 'Epic' },
  { key: 'time_108000', threshold: 108000, title: 'Book Lover!', description: 'Read for 30 hours', rarity: 'Epic' },
  { key: 'time_180000', threshold: 180000, title: 'Bibliophile!', description: 'Read for 50 hours', rarity: 'Legendary' },
  { key: 'time_360000', threshold: 360000, title: 'Book Connoisseur!', description: 'Read for 100 hours', rarity: 'Legendary' },
  { key: 'time_720000', threshold: 720000, title: 'Reading Prodigy!', description: 'Read for 200 hours', rarity: 'Mythic' }
];

const achievementBookThresholds: Achievement[] = [
  { key: 'book_1', threshold: 1, title: 'The Bookworm Begins!', description: 'Complete your first book', rarity: 'Common' },
  { key: 'book_5', threshold: 5, title: 'Page Turner!', description: 'Complete 5 books', rarity: 'Common' },
  { key: 'book_10', threshold: 10, title: 'Book Finisher!', description: 'Complete 10 books', rarity: 'Uncommon' },
  { key: 'book_20', threshold: 20, title: 'Literary Explorer!', description: 'Complete 20 books', rarity: 'Uncommon' },
  { key: 'book_50', threshold: 50, title: 'Book Conqueror!', description: 'Complete 50 books', rarity: 'Rare' },
  { key: 'book_100', threshold: 100, title: 'Book Collector!', description: 'Complete 100 books', rarity: 'Epic' },
  { key: 'book_200', threshold: 200, title: 'The Bibliophile!', description: 'Complete 200 books', rarity: 'Legendary' },
  { key: 'book_300', threshold: 300, title: 'Reading Prodigy!', description: 'Complete 300 books', rarity: 'Mythic' },
  { key: 'book_500', threshold: 500, title: 'The Ultimate Reader!', description: 'Complete 500 books', rarity: 'Mythic' }
];

const socialAchievementThresholds: Achievement[] = [
  { key: 'social_like_1', threshold: 1, title: 'My First Like!', description: 'Receive your first like', rarity: 'Common' },
  { key: 'social_like_10', threshold: 10, title: 'Popular Paragraph!', description: 'Receive 10 likes on your comments or highlights', rarity: 'Uncommon' },
  { key: 'social_review_1', threshold: 1, title: 'My First Review!', description: 'Leave your first book review', rarity: 'Common' },
  { key: 'social_review_liked_5', threshold: 5, title: 'Talk of the Town!', description: 'Get 5 reviews liked by others', rarity: 'Rare' },
  { key: 'social_follow_1', threshold: 1, title: 'Book Buddy!', description: 'Follow your first reader', rarity: 'Common' },
  { key: 'social_followers_10', threshold: 10, title: 'Growing Circle!', description: 'Gain 10 followers', rarity: 'Uncommon' },
  { key: 'social_followers_50', threshold: 50, title: 'Literary Leader!', description: 'Reach 50 followers', rarity: 'Epic' },
  { key: 'social_share_1', threshold: 1, title: 'Shared the Word!', description: 'Share a book with someone', rarity: 'Common' }
];

const tierBasedMilestoneBadges: TierBadge[] = [
  { key: 'tier_bronze', title: 'Bronze Reader', description: 'Read 5 books and 1 hour total', criteria: { books: 5, time: 3600 }, tier: 'Bronze' },
  { key: 'tier_silver', title: 'Silver Reader', description: 'Read 20 books and 10 hours total', criteria: { books: 20, time: 36000 }, tier: 'Silver' },
  { key: 'tier_gold', title: 'Gold Reader', description: 'Read 50 books and 50 hours total', criteria: { books: 50, time: 180000 }, tier: 'Gold' },
  { key: 'tier_platinum', title: 'Platinum Reader', description: 'Read 100 books and 100 hours total', criteria: { books: 100, time: 360000 }, tier: 'Platinum' },
  { key: 'tier_diamond', title: 'Diamond Reader', description: 'Read 300 books and 200 hours total', criteria: { books: 300, time: 720000 }, tier: 'Diamond' }
];

export {
  achievementTimeThresholds,
  achievementBookThresholds,
  socialAchievementThresholds,
  tierBasedMilestoneBadges
};