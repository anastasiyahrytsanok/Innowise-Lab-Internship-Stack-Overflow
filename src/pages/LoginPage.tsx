import EnterForm from "../components/EnterForm/EnterForm";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { loginRequest } from "../api/auth/auth";
import type { LoginBody } from "../api/auth/auth.types";
import { useAuthStore } from "../store/auth.store";
import { PAGE_NAVIGATION } from "../constants";

const LoginPage = () => {
  const navigate = useNavigate();

  const setUser = useAuthStore((s) => s.setUser);

  const loginMutation = useMutation({
    mutationFn: (data: LoginBody) => loginRequest(data),
    onSuccess: (data) => {
      setUser(data.data);
      navigate(PAGE_NAVIGATION.HOME, { replace: true });
    },
  });

  const onSubmit = async (body: LoginBody): Promise<void> => {
    await loginMutation.mutateAsync(body);
  };

  return <EnterForm isRegistration={false} onSubmit={onSubmit} />;
};

export default LoginPage;
