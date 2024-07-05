import { Outlet, useNavigation } from "react-router-dom";
import SideBar from "./SideBar";
import Header from "./Header";
import styled from "styled-components";
const StyledLayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;

  grid-template-rows: auto 1fr;
  height: 100vh;
`;
const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 2rem 6rem;
  overflow: scroll;
  overflow: -moz-hidden-none;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;
const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;
function AppLayout() {
  return (
    <StyledLayout>
      <Header />
      <SideBar />
      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>
    </StyledLayout>
  );
}

export default AppLayout;
