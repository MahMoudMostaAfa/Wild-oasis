import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useCreateCabin() {
  const queryClient = useQueryClient();

  const { mutate: createCabin, isLoading: isCreating } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success("Cabin created successfully");

      queryClient.invalidateQueries({
        queryKey: ["cabin"],
      });
    },
    onError: (error) => {
      toast.error("An error occurred while creating the cabin");
    },
  });

  return { createCabin, isCreating };
}
