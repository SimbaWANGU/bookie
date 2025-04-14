import { userAtom } from "@stores/user.state";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@utils/supabase";
import { useAtom } from "jotai";

const useUserFollows = () => {
  const [user] = useAtom(userAtom);
  
  const { data, isLoading, error } = useQuery<{ followee: string }[]>({
    queryKey: ['Users Followed', user?.id],
    queryFn: async () => { 
      const { data: follows, error: followsError } = await supabase
        .from('user_follows_user')
        .select('followee')
        .eq('follower', user?.id);
  
      if (followsError) {
        throw new Error(followsError.message);
      }
  
      return follows;
    },
    enabled: !!user?.id
  });

  return { data, isLoading, error };
};

export default useUserFollows;