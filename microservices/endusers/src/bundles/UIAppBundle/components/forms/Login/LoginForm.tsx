import { useForm } from "react-hook-form";
import { LoginInput } from "src/api.types";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./schema";

export type LoginFormProps = {
  onSubmit: (input: LoginInput) => Promise<void>;
};

export const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit as any)}>
        <input type="text" {...register("usename")} />
        <input type="password" {...register("password")} />
      </form>
    </div>
  );
};
