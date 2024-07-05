import { HiArrowDownOnSquare, HiArrowRightOnRectangle } from "react-icons/hi2";
import ButtonIcon from "../../ui/ButtonIcon";
import { useLogout } from "./useLogout";
import SpinnerMini from "../../ui/SpinnerMini";

function Logout() {
  const { isLoading, logout } = useLogout();
  function handleLogout() {
    logout();
  }
  return (
    <ButtonIcon onClick={handleLogout}>
      {isLoading ? <SpinnerMini /> : <HiArrowRightOnRectangle />}
    </ButtonIcon>
  );
}

export default Logout;
