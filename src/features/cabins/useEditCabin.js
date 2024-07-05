import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useEditCabin() {
  const queryClient = useQueryClient();
  const { mutate: editCabin, isLoading: isEditing } = useMutation({
    mutationFn: ({ cabin, cabinId }) => createEditCabin(cabin, cabinId),
    onSuccess: () => {
      toast.success("Cabin updated successfully");

      queryClient.invalidateQueries({
        queryKey: ["cabin"],
      });
    },
    onError: (error) => {
      toast.error("An error occurred while updating the cabin");
    },
  });
  return { isEditing, editCabin };
}
