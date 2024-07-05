import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Spinner from "../ui/Spinner";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoutes({ children }) {
  const navigate = useNavigate();
  // load the authenticated user
  const { isAuthenticated, isLoading } = useUser();
  // if the user is not authenticated, redirect to the login page
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/login");
    }
  }, [isLoading, isAuthenticated, navigate]);
  // if loading show a spinner
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  if (!isLoading && !isAuthenticated) return null;
  // if the user is authenticated, show the app
  return isAuthenticated && children;
}

export default ProtectedRoutes;
