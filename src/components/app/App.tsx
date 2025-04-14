import React, { useEffect } from 'react';
import { Text } from 'react-native';
import SettingHeader from '@components/headers/settingHeader';
import { SplashScreen, Stack } from 'expo-router';
import { CustomUser } from '@models/userProfile.type';
import { userAtom } from '@stores/user.state';
import { supabase } from '@utils/supabase';
import { useAtom } from 'jotai';
import { useQuery } from '@tanstack/react-query';
import { fetchCustomUser } from '@api/profile/api.user';

const App = () => {
  const [, setSession] = useAtom(userAtom);

  const { data, error, isLoading } = useQuery<CustomUser>({
    queryKey: ['get-user'],
    queryFn: fetchCustomUser,
  });

  // Use an effect so that side effects run after the render.
  useEffect(() => {
    if (data) {
      setSession(data);
      SplashScreen.hideAsync();
    }
  }, [data, isLoading]);

  if (isLoading) {
    // Render a loading indicator or nothing while loading
    return null;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="(home)"
        options={{ headerShown: false }}
        getId={() => String(Date.now())}
      />
      <Stack.Screen
        name="book"
        options={{ headerShown: false }}
        getId={() => String(Date.now())}
      />
      <Stack.Screen
        name="auth"
        options={{ headerShown: false }}
        getId={() => String(Date.now())}
      />
      <Stack.Screen
        name="settings"
        options={{
          headerShown: true,
          header: () => <SettingHeader />,
        }}
        getId={() => String(Date.now())}
      />
    </Stack>
  );
};

export default App;