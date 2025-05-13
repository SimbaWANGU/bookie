import { useKeepAwake, deactivateKeepAwake } from 'expo-keep-awake';
import { useFocusEffect } from 'expo-router';
import { useCallback } from 'react';

export function useKeepAwakeOnScreen(identifier = 'reading-screen') {
  useFocusEffect(
    useCallback(() => {
      useKeepAwake(identifier);

      return () => {
        deactivateKeepAwake(identifier)
      };
    }, [])
  );
}