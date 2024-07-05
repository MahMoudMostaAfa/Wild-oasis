import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin as deleteCabinApi } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useDeleteCabin(loadingToastId) {
  // to make cabin invalidate to update the UI
  const queryClient = useQueryClient();
  // to delete the cabin
  const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
    mutationFn: deleteCabinApi,
    // to tell the query to invalidate the cache

    onSuccess: () => {
      toast.dismiss(loadingToastId); // Dismiss the loading toast
      toast.success("Cabin deleted successfully");
      queryClient.invalidateQueries({
        queryKey: ["cabin"],
      });
    },
    onError: (err) => {
      toast.dismiss(loadingToastId); // Dismiss the loading toast
      toast.error("Failed to delete cabin");
    },
  });

  return { isDeleting, deleteCabin };
}
