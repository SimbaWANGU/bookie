import { CustomUser } from "@models/userProfile.type"
import { userAtom } from "@stores/user.state"
import { supabase } from "@utils/supabase"
import { useAtom } from "jotai"
import { useEffect } from "react"

function useAuthSessionSync() {
  const [, setSession] = useAtom(userAtom)

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((_, session) => {
      if (session?.user) {
        supabase.from('users').select('*').eq('id', session.user.id).single()
          .then(({ data, error }) => {
            if (data) setSession(data as CustomUser)
            else if (error) console.error(error)
          })
      } else {
        setSession(null)
      }
    })

    return () => authListener.subscription.unsubscribe()
  }, [])
}

export default useAuthSessionSync