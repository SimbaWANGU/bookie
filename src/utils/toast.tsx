import { SuccessToast } from 'toastify-react-native'

const toastConfig = {
  success: () => (
    <SuccessToast />
  ),
  info: () => (
    <AchievementToast  />
  ),
  error: () => (
    <AchievementToast  />
  ),
  default: () => (
    <AchievementToast />
  ),
};

export {
  toastConfig
}