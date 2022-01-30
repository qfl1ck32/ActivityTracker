import { LoginInput } from "src/api.types";
import { useAppGuardian } from "src/bundles/UIAppBundle/services";
import { LoginForm } from "../../forms";

export const LoginContainer: React.FC = () => {
  const guardian = useAppGuardian();

  const onSubmit = async (data: LoginInput) => {
    try {
      const { username, password } = data;
      await guardian.login(username, password);
      alert("Successfully logged in");
    } catch (err: any) {
      alert("Error: " + err.toString());
    }
  };

  return (
    <div>
      <LoginForm {...{ onSubmit }} />
    </div>
  );
};
