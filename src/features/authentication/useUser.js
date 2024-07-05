import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiLogin";

export function useUser() {
  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });
  // console.log(user);
  return { user, isLoading, isAuthenticated: user?.role === "authenticated" };
}
