import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import { useDeleteCabin } from "./useDeleteCabin";
import toast from "react-hot-toast";

import CreateCabinForm from "./CreateCabinForm";
import Button from "../../ui/Button";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { formatCurrency } from "../../utils/helpers";
import { HiPencilSquare, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import { useCreateCabin } from "./useCreateCabin";
import Model from "../../ui/Modal";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  /* justify-items: center; */
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
  // to show the loading toast
  const loadingToastId = useRef(null);
  const { isDeleting, deleteCabin } = useDeleteCabin(loadingToastId);
  const { isCreating, createCabin } = useCreateCabin();

  const {
    id: cabinId,
    name,
    maxCapacity,
    regularPrice,
    discount,
    image,
    description,
  } = cabin;
  function handelDuplicate() {
    if (name.startsWith("copy of")) return;
    createCabin({
      name: `copy of ${name}`,
      maxCapacity,
      regularPrice,
      discount,
      image,
      description,
    });
  }

  useEffect(() => {
    if (isDeleting) {
      loadingToastId.current = toast.loading("Deleting cabin...");
    } else if (loadingToastId.current) {
      toast.dismiss(loadingToastId.current);
      loadingToastId.current = null;
    }
  }, [isDeleting]);

  return (
    <Table.Row role="row">
      <Img src={image} alt={description} />
      <Cabin>{name}</Cabin>
      <Capacity>fits up to {maxCapacity} guests</Capacity>
      <Price>{formatCurrency(regularPrice)}</Price>
      {discount ? (
        <Discount>{formatCurrency(discount)}</Discount>
      ) : (
        <span>&mdash;</span>
      )}

      <div>
        <Model>
          <Menus.Menu>
            <Menus.Toggle id={cabinId} />
            <Menus.List id={cabinId}>
              <Menus.Button icon={<HiSquare2Stack />} onClick={handelDuplicate}>
                duplicate
              </Menus.Button>

              <Model.Open opens="edit">
                <Menus.Button icon={<HiPencilSquare />}>edit</Menus.Button>
              </Model.Open>

              <Model.Open opens="delete">
                <Menus.Button icon={<HiTrash />}>delete</Menus.Button>
              </Model.Open>
            </Menus.List>
            <Model.Window name="edit">
              <CreateCabinForm cabinToEdit={cabin} />
            </Model.Window>
            <Model.Window name="delete">
              <ConfirmDelete
                resourceName={`${name} cabin`}
                onConfirm={() => deleteCabin(cabinId)}
                disabled={isDeleting}
              />
            </Model.Window>
          </Menus.Menu>
        </Model>
      </div>
    </Table.Row>
  );
}

export default CabinRow;
