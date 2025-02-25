import { useAppStore } from '@stores/useAppStore'

const useFirstTimeOnApp = (): [boolean, (firstTimeOnApp: boolean) => void] => {
  const [firstTimeOnApp, setFirstTimeOnApp] = useAppStore((state) => [state.firstTimeOnApp, state.setFirstTimeOnApp])

  return [firstTimeOnApp, setFirstTimeOnApp]
}

export default useFirstTimeOnApp
