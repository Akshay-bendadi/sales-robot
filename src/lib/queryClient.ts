import { QueryClient, QueryCache, MutationCache } from "@tanstack/react-query";
import { toast } from "sonner";

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      toast.error(error.message || "Something went wrong with the query");
    },
  }),
  mutationCache: new MutationCache({
    onError: (error) => {
      toast.error(error.message || "Something went wrong with the mutation");
    },
  }),
});
