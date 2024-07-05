import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useCheckout() {
  const queryClient = useQueryClient();

  const { mutate: checkOut, isLoading: isCheckingOut } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),

    onSuccess: (data) => {
      toast.success(`#${data.id} Checked out successfully`);
      queryClient.invalidateQueries({ active: true });
    },
    onError: (error) => {
      toast.error("Could not check out");
    },
  });

  return { checkOut, isCheckingOut };
}
