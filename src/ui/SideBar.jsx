import styled from "styled-components";
import Logo from "./Logo";
import MainNav from "./MainNav";
import Uploader from "../data/Uploader";
const StyledSideBar = styled.aside`
  background-color: var(--color-grey-0);
  padding: 3.2rem 2.4rem;
  border-right: 1px solid var(--color-grey-100);
  grid-row: 1/-1;
  @media screen and (max-width: 768px) {
    grid-row: 2/3;
    grid-col: 1/-1;
    padding: 1rem 1rem;
    & .logo {
      display: none;
    }
  }
`;
function SideBar() {
  return (
    <StyledSideBar>
      <Logo />
      <MainNav />
      {/* <Uploader /> */}
    </StyledSideBar>
  );
}

export default SideBar;
