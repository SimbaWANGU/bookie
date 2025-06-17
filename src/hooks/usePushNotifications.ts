import * as Notifications from 'expo-notifications'
import * as Device from 'expo-device'
import { Platform } from 'react-native'
import Constants from 'expo-constants'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowAlert: true
  })
})

const sendPushNotification = async (expoPushToken: string, user_id: string) => {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: 'Original Title',
    body: 'And here is the body',
    data: {
      type: 'usersprofile',
      someData: 'would be here',
      user_id
    }
  }

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Authorization': `Bearer LAccxKwAejim-MBVuBQEuizIChPeOgRTjk0Jk0Ql`,
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  })
}

const handleRegistrationError = (errorMessage: string) => {
  alert(errorMessage);
  throw new Error(errorMessage);
}

const registerForPushNotificationsAsync = async (): Promise<string | undefined> => {
  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.HIGH,
      vibrationPattern: [0, 250, 250, 250],
      sound: 'default',
      lightColor: '#FF231F7C',
    });
  } 

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync()
    let finalStatus = existingStatus

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync()
      finalStatus = status
    }

    if (finalStatus !== 'granted') {
      handleRegistrationError('Permission not granted, push notifications will remain disabled')
      return
    }

    const projectId = Constants?.expoConfig?.extra?.eas?.projectId

    if (!projectId) {
      handleRegistrationError('App does not exist')
    }

    try {
      const pushTokenString = (await Notifications.getExpoPushTokenAsync({ projectId })).data
      return pushTokenString
    } catch (e: unknown) {
      handleRegistrationError(`${e}`)
      return undefined
    }
  } else {
    handleRegistrationError('Must use physical device for push notifications')
    return undefined
  }
}

export { registerForPushNotificationsAsync, sendPushNotification }