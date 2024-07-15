import { supabase } from "@/src/lib/supabase";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

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
          //image: data.image,
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