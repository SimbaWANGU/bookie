import { useUserStore } from "@stores/useUserStore"
import { Session } from "@supabase/supabase-js"

const useSession = (): [Session | null, (session: Session | null) => void] => {
  const [session, setSession] = useUserStore((state) => [state.session, state.setSession])

  return [session, setSession]
}

export default useSession
