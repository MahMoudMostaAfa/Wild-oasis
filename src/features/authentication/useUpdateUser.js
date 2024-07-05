import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";
import { updateCurrentUser } from "../../services/apiLogin";
export function useUpdateUser() {
  const queryClient = useQueryClient();
  const { mutate: updateUser, isLoading: isUpdating } = useMutation({
    mutationFn: ({ fullName, password, avatar }) =>
      updateCurrentUser({ fullName, password, avatar }),
    onSuccess: () => {
      toast.success("user updated successfully");

      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
    onError: (error) => {
      toast.error("An error occurred while updating the user");
    },
  });
  return { isUpdating, updateUser };
}
