import { Achievement } from "@models/achievement.type";
import { atom } from "jotai";

const awardedAchievementsAtom = atom<Achievement[]>([])

export {
  awardedAchievementsAtom
}
