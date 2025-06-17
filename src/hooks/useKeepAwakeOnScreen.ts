import { useKeepAwake, deactivateKeepAwake, activateKeepAwakeAsync } from 'expo-keep-awake';
import { useFocusEffect } from 'expo-router';
import { useCallback } from 'react';

const useKeepAwakeOnScreen = (identifier = 'reading-screen') => {
  useFocusEffect(
    useCallback(() => {
      activateKeepAwakeAsync(identifier)

      return () => {
        deactivateKeepAwake(identifier)
      };
    }, [])
  );
}

export default useKeepAwakeOnScreen