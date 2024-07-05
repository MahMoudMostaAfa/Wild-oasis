import { useQuery, useQueryClient } from "@tanstack/react-query";

import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useBookings() {
  const [searchParams] = useSearchParams();
  // for prefetching
  const queryClient = useQueryClient();

  // 1) FILITER
  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : {
          field: "status",
          value: filterValue,
        };

  // 2) SORT
  const sortByValue = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortByValue.split("-");
  const sortBy = {
    field,
    direction,
  };

  // 3)PAGINATION
  const currentPage = searchParams.get("page")
    ? Number(searchParams.get("page"))
    : 1;

  const {
    isLoading,
    error,
    data: { data: bookings, count } = {},
  } = useQuery({
    queryKey: ["bookings", filterValue, sortBy, currentPage],
    queryFn: () => getBookings({ filter, sortBy, currentPage }),
  });

  const numberOfPages = Math.ceil(count / PAGE_SIZE);

  // Prefetch the next page
  if (currentPage < numberOfPages) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filterValue, sortBy, currentPage + 1],
      queryFn: () =>
        getBookings({ filter, sortBy, currentPage: currentPage + 1 }),
    });
  }

  // Prefetch the previous page

  if (currentPage > 1) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filterValue, sortBy, currentPage - 1],
      queryFn: () =>
        getBookings({ filter, sortBy, currentPage: currentPage - 1 }),
    });
  }
  return { isLoading, error, bookings, count };
}
