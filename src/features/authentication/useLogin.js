import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MdEmail } from "react-icons/md";
import { login as loginApi } from "../../services/apiLogin";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (loginData) => {
      queryClient.setQueriesData(["user"], loginData.user);
      navigate("/dashboard", { replace: true });
      toast.success("Logged in successfully");
    },
    onError: () => {
      //  console.log(error);
      toast.error("email or password is incorrect");
    },
  });
  return { login, isLoading };
}
