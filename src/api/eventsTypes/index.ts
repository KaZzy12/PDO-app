import { supabase } from "@/src/lib/supabase";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useEventsTypes = () => {
    return useQuery({
        queryKey: ['eventsTypes'],
        queryFn: async () => {
          const { data, error } = await supabase
            .from('events_types')
            .select("value, label");
          if(error) {
            throw new Error(error.message);
          }
          return data;
        },
    });
};
