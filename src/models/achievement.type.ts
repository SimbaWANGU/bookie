interface Achievement {
  key: string
  threshold: number;
  title: string;
  description: string;
  rarity: 'Common' | 'Uncommon' | 'Rare' | 'Epic' | 'Legendary' | 'Mythic';
}

// export interface GenreAchievement extends Achievement {
//   genre: string;
// }

interface TierBadge {
  key: string
  title: string;
  description: string;
  tier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum' | 'Diamond';
  criteria: {
    books: number;
    time: number; // in seconds
  };
}

export {
  Achievement,
  TierBadge
}