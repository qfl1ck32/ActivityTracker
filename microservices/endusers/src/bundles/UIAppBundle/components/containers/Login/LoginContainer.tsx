import { useRouter } from "@bluelibs/x-ui-next";
import { useEffect } from "react";
import { LoginInput } from "src/api.types";
import { Routes } from "src/bundles/UIAppBundle";
import { useAppGuardian } from "src/bundles/UIAppBundle/services";
import { LoginForm } from "../../forms";

import { toast } from 'react-toastify'

export const LoginContainer: React.FC = () => {
  const guardian = useAppGuardian();

  const router = useRouter();

  useEffect(() => {
    if (guardian.state.isLoggedIn) {
      router.go(Routes.Home);
    }
  });

  const onSubmit = async (data: LoginInput) => {
    try {
      const { username, password } = data;
      await guardian.login(username, password);
      toast.info("Successfully logged in!");
    } catch (err: any) {
      toast.error(err.toString());
    }
  };

  if (guardian.state.isLoggedIn) return null;

  return (
    <div>
      <LoginForm {...{ onSubmit }} />
    </div>
  );
};
