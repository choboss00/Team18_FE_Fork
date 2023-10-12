import InputBox from "../atoms/InputBox";
import Button from "../../common/Button";
import useValidation from "../hooks/useValidation";

const LoginForm = ({ inputProps, inputGroup }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <main className="max-w-[500px]">
          {inputProps.map((inputField) => {
            const validationHook = useValidation("", inputField.error);
            return (
              <InputBox
                key={inputField.id}
                id={inputField.id}
                label={inputField.label}
                type={inputField.type}
                placeholder={inputField.placeholder}
                variant={inputField.variant}
                error={validationHook.error}
                msg={inputField.msg}
                value={validationHook.value}
                onChange={validationHook.handleChange}
              />
            );
          })}

          <Button color="orange" size="xl">
            Log In
          </Button>
        </main>
      </form>
    </>
  );
};

export default LoginForm;
