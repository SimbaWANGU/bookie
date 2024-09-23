import { useBookStore } from "@stores/useBookStore"

const useTimer = (): [number, (timer: number) => void] => {
  const [timer, setTimer] = useBookStore((state) => [state.timer, state.setTimer])

  return [timer, setTimer]

}

export default useTimer