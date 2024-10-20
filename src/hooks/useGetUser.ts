import { useQuery } from "@tanstack/react-query";
import { User, getUser } from "../api/user";
import { USER_QUERY_KEY } from "./constants";

export const useGetUser = (id: string) => {
  const { data, error, isLoading, refetch } = useQuery<User>({
    queryKey: [USER_QUERY_KEY, id],
    queryFn: () => getUser(id),
    retry: 1,
  });
  return { data, error, isLoading, refetch };
};
