import { supabase } from "@/src/lib/supabase";
import { useQuery } from "@tanstack/react-query";

export const useEventsList = () => {
    return useQuery({
        queryKey: ['events'],
        queryFn: async () => {
          const { data, error } = await supabase.from('events').select('*');
          if(error) {
            throw new Error(error.message);
          }
          return data;
        },
    });
};

export const useEvent = (id: number) => {
    return useQuery({
        queryKey: ['events', id],
        queryFn: async () => {
          const { data, error } = await supabase
            .from('events')
            .select('*')
            .eq('id', id)
            .single();
          if(error) {
            throw new Error(error.message);
          }
          return data;
        },
    });
};

export const useEventAttendees = (id: number) => {
    return useQuery({
        queryKey: ['eventAttendees', id],
        queryFn: async () => {
          const { data, error } = await supabase
            .from('event_attendee')
            .select(`
              profiles (
                id,
                full_name
              )
            `)
            .eq('event_id', id);
          if(error) {
            throw new Error(error.message);
          }
          return data;
        },
    });
}