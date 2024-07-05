import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Model from "../../ui/Modal";
//import CabinTable from "./CabinTable";
function AddCabin() {
  return (
    <Model>
      <Model.Open opens="cabin-form">
        <Button>Add new cabin</Button>
      </Model.Open>
      <Model.Window name="cabin-form">
        <CreateCabinForm />
      </Model.Window>
      {/* <Model.Open opens="table">
        <Button>Add new cabin</Button>
      </Model.Open>
      <Model.Window name="table">
        <CabinTable />
      </Model.Window> */}
    </Model>
  );
}

// function AddCabin() {
//   const [isModelOpen, setIsModelOpen] = useState(false);
//   return (
//     <>
//       <Button onClick={() => setIsModelOpen((e) => !e)}>add new cabin</Button>
//       {isModelOpen && (
//         <Model onCloseModel={setIsModelOpen}>
//           <CreateCabinForm onCloseModel={setIsModelOpen} />
//         </Model>
//       )}
//     </>
//   );
// }

export default AddCabin;
