import { Achievements } from '@Interfaces/Achievement/achievement'

const achievementTimeThresholds: Achievements[] = [
	{ threshold: 60, title: 'Starting Out!', description: 'Read for 1 minute' },
	{ threshold: 600, title: 'Good Habit!', description: 'Read for 10 minutes' },
	{ threshold: 1800, title: 'Dedicated Reader!', description: 'Read for 30 minutes' },
	{ threshold: 3600, title: 'Book Worm!', description: 'Read for 1 hour' },
	{ threshold: 7200, title: 'Literary Aficionado!', description: 'Read for 2 hours' },
	{ threshold: 18000, title: 'Literary Devourer!', description: 'Read for 5 hours' },
	{ threshold: 36000, title: 'Reading Enthusiast!', description: 'Read for 10 hours' },
	{ threshold: 72000, title: 'Literary Apprentice!', description: 'Read for 20 hours' },
	{ threshold: 108000, title: 'Book Lover!', description: 'Read for 30 hours' },
	{ threshold: 180000, title: 'Bibliophile!', description: 'Read for 50 hours' },
	{ threshold: 360000, title: 'Book Connoisseur!', description: 'Read for 100 hours' },
	{ threshold: 720000, title: 'Reading Prodigy!', description: 'Read for 200 hours' }
]

const achievementBookThresholds: Achievements[] = [
	{ threshold: 1, title: 'The Bookworm Begins!', description: 'Complete my first book' },
	{ threshold: 2, title: 'Page Turner!', description: 'Complete 2 books' },
	{ threshold: 5, title: 'Literary Journeyman!', description: 'Complete 5 books' },
	{ threshold: 10, title: 'Book Finisher!', description: 'Complete 10 books' },
	{ threshold: 20, title: 'Literary Explorer!', description: 'Complete 20 books' },
	{ threshold: 30, title: 'Bookworm Extraordinaire!', description: 'Complete 30 books' },
	{ threshold: 50, title: 'Book Conqueror!', description: 'Complete 50 books' },
	{ threshold: 75, title: 'Master of Stories!', description: 'Complete 75 books' },
	{ threshold: 100, title: 'Book Collector!', description: 'Complete 100 books' },
	{ threshold: 125, title: 'Reading Virtuoso!', description: 'Complete 125 books' },
	{ threshold: 150, title: 'Literary Champion!', description: 'Complete 150 books' },
	{ threshold: 175, title: 'Book Devotee!', description: 'Complete 175 books' },
	{ threshold: 200, title: 'The Bibliophile!', description: 'Complete 200 books' },
	{ threshold: 250, title: 'Book Maestro!', description: 'Complete 250 books' },
	{ threshold: 300, title: 'Reading Prodigy!', description: 'Complete 300 books' },
	{ threshold: 350, title: 'Master of Pages!', description: 'Complete 350 books' },
	{ threshold: 400, title: 'Literary Genius!', description: 'Complete 400 books' },
	{ threshold: 450, title: 'Book Aficionado!', description: 'Complete 450 books' },
	{ threshold: 500, title: 'The Ultimate Reader!', description: 'Complete 500 books' }
]

export {
	achievementTimeThresholds,
	achievementBookThresholds
}
