import { supabase } from "@/src/lib/supabase";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useEventsList = (today: string) => {
    return useQuery({
        queryKey: ['events'],
        queryFn: async () => {
          const { data, error } = await supabase
            .from('events')
            .select('*')
            .or(`type.eq.anniversaire, date.gte.${ today }`);
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
            .select(`
              id,
              name,
              date,
              type,
              events_types ( 
                value,
                image
              )
            `)
            .eq('id', id)
            .single();
          if(error) {
            throw new Error(error.message);
          }
          return data;
        },
    });
};

export const useInsertEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn(data: any) {
      const { error, data: newEvent } = await supabase
        .from('events')
        .insert({
          name: data.name,
          date: data.date,
          type: data.type,
        })
        .single();

      if(error) {
        throw new Error(error.message);
      }
      return newEvent;
    },
    async onSuccess() {
      await queryClient.invalidateQueries({ queryKey: ['events']});
    },
  });
};