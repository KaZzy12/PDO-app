import { supabase } from "@/src/lib/supabase";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

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
};

export const useInsertAttendee = () => {
    const queryClient = useQueryClient();

    return useMutation({
        async mutationFn(data: any) {
          const { error, data: newAttendee } = await supabase
            .from('event_attendee')
            .insert({
              event_id: data.event_id,
              attendee_id: data.attendee_id,
            })
            .single();
    
          if(error) {
            throw new Error(error.message);
          }
          return newAttendee;
        },
        async onSuccess(_, data) {
          await queryClient.invalidateQueries({ queryKey: ['eventAttendees', data.event_id]});
        },
    });
};
export const useDeleteAttendee = () => {
    const queryClient = useQueryClient();

    return useMutation({
        async mutationFn(data: any) {
          const { error, data: newAttendee } = await supabase
            .from('event_attendee')
            .delete()
            .eq('event_id', data.event_id)
            .eq('attendee_id', data.attendee_id)
            .select()
            .single();
    
          if(error) {
            throw new Error(error.message);
          }
          return newAttendee;
        },
        async onSuccess(_, data) {
          await queryClient.invalidateQueries({ queryKey: ['eventAttendees', data.event_id]});
        },
    });
};