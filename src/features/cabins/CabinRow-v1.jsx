import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import Button from "../../ui/Button";
import { deleteCabin } from "../../services/apiCabins";

import { formatCurrency } from "../../utils/helpers";
import CreateCabinForm from "./CreateCabinForm";
const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  /* justify-items:center; */
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;
const Capacity = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-grey-600);
`;
function CabinRow({ cabin }) {
  const [showForm, setShowForm] = useState(false);
  const {
    id: cabinId,
    name,
    maxCapacity,
    regularPrice,
    discount,
    image,
    description,
  } = cabin;

  // to make cabin invalidate to update the UI
  const queryClient = useQueryClient();
  // to delete the cabin
  const { isLoading, mutate } = useMutation({
    mutationFn: deleteCabin,
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

  // to show the loading toast
  const loadingToastId = useRef(null);

  useEffect(() => {
    if (isLoading) {
      loadingToastId.current = toast.loading("Deleting cabin...");
    } else if (loadingToastId.current) {
      toast.dismiss(loadingToastId.current);
      loadingToastId.current = null;
    }
  }, [isLoading]);

  return (
    <>
      <TableRow role="row">
        <Img src={image} alt={description} />
        <Cabin>{name}</Cabin>
        <Capacity>fits up to {maxCapacity} guests</Capacity>
        <Price>{formatCurrency(regularPrice)}</Price>
        {discount ? (
          <Discount>{formatCurrency(discount)}</Discount>
        ) : (
          <span>&mdash;</span>
        )}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "1.2rem",
            alertItems: "center",
          }}
        >
          <Button variation="primary" onClick={() => setShowForm((e) => !e)}>
            edit
          </Button>
          <Button
            variation="danger"
            onClick={() => mutate(cabinId)}
            disabled={isLoading}
          >
            delete
          </Button>
        </div>
      </TableRow>
      {showForm && <CreateCabinForm cabinToEdit={cabin} />}
    </>
  );
}

export default CabinRow;
