import React, { useEffect } from 'react'
import { Slot, SplashScreen } from 'expo-router'
import { CustomUser } from '@models/userProfile.type'
import { userAtom } from '@stores/user.state'
import { useAtom } from 'jotai'
import { useQuery } from '@tanstack/react-query'
import { fetchCustomUser } from '@api/profile/api.user'
import { QueryKeys } from '@constants/QueryKeys'
import { firstTimeOnAppAtom } from '@stores/firstTimeonApp.state'

const Main = () => {
  const [, setSession] = useAtom(userAtom)
  const [firstTimeOnApp] = useAtom(firstTimeOnAppAtom)

  const { data, isLoading } = useQuery<CustomUser>({
    queryKey: [QueryKeys.getUser],
    queryFn: fetchCustomUser,
  })

  console.log(data, isLoading)

  // Set the session when data is available
  useEffect(() => {
    if (data) {
      console.log('main: ', data)
      setSession(data)
    }
  }, [data, isLoading, firstTimeOnApp])

  useEffect(() => {
    if (!isLoading) {
      SplashScreen.hideAsync()
    }
  }, [isLoading])


  if (isLoading) {
    return null
  }
  // ✅ Authenticated user
  return (
    <Slot />
  )
}

export default Main