import React from "react";
import { useForm, FormProvider, Controller } from "react-hook-form";
import InputBox from "../atoms/InputBox";
import Button from "../../common/Button";
import { useAtom } from "jotai";
import { userAtom } from "../../../store";
import { login } from "../../../apis/user";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ inputProps }) => {
  const navigate = useNavigate();
  const methods = useForm();
  const { watch, control, handleSubmit } = methods;
  const email = watch("email");
  const password = watch("password");

  const [user, setUser] = useAtom(userAtom);

  const onSubmit = async () => {
    try {
      const response = await login({
        email: email,
        password: password,
      });

      if (response.data.message === "Login successful") {
        setUser(response.data.user);
        console.log(response.data.message); // 로그인 성공 실패 여부 확인
        localStorage.setItem("token", response.headers.authorization);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        navigate("/", { replace: true });
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <main className="max-w-[500px]">
          {inputProps.map((inputField) => (
            <Controller
              name={inputField.name}
              key={inputField.name}
              control={methods.control}
              defaultValue=""
              rules={inputField.rules}
              render={({ field, fieldState }) => (
                <InputBox
                  {...field}
                  id={inputField.name}
                  label={inputField.label}
                  variant={inputField.variant}
                  type={inputField.type}
                  placeholder={inputField.placeholder}
                  error={fieldState.invalid}
                  helperText={
                    fieldState.invalid ? fieldState.error.message : ""
                  }
                  triggerValidation={methods.trigger}
                />
              )}
            />
          ))}
          <Button color="orange" size="xl" type="submit">
            Log In
          </Button>
        </main>
      </form>
    </FormProvider>
  );
};
export default LoginForm;
