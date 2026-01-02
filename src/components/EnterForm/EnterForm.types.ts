import type { RegisterBody } from "../../api/register/register.types";

export interface EnterFormProps {
  isRegistration: boolean;
  onSubmit: (body: RegisterBody) => Promise<void>;
}

export type EnterFormValues = {
  username: string;
  password: string;
  confirmPassword?: string;
};
