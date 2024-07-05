import { useMutation } from "@tanstack/react-query";
import { signUp as signUpApi } from "../../services/apiLogin";
import toast from "react-hot-toast";

export function useSignup() {
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: ({ fullName, email, password }) =>
      signUpApi({ fullName, email, password }),

    onSuccess: (data) => {
      console.log(data);
      toast.success("Account created successfully,please confirm your email");
    },
  });

  return { signup, isLoading };
}
