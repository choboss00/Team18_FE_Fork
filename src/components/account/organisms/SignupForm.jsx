import InputBox from "../atoms/InputBox";
import Button from "../../common/Button";
import Dropdown from "../../common/Dropdown";
import { useState } from "react";
import { useForm, FormProvider, Controller } from "react-hook-form";
import COUNTRY from "../constants/COUNTRY";
import CheckBox from "../atoms/CheckBox";

const SignupForm = ({ inputProps }) => {
  const methods = useForm();

  const [selectedOption, setSelectedOption] = useState("the United States");

  const handleOptionChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };

  const [selectedRole, setSelectedRole] = useState("");

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  const onSubmit = (data) => {
    console.log(data, selectedRole);
  };

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="w-[500px]">
            <div className="flex gap-10">
              {inputProps
                .filter(
                  (props) =>
                    props.name === "FirstName" || props.name === "LastName"
                )
                .map((inputField) => {
                  return (
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
                  );
                })}
            </div>
            {inputProps
              .filter(
                (inputField) =>
                  inputField.name !== "FirstName" &&
                  inputField.name !== "LastName"
              )
              .map((inputField) => {
                return (
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
                );
              })}
            <CheckBox
              value="mentor"
              type="radio"
              checked={selectedRole === "mentor"}
              onChange={handleRoleChange}
            >
              Mentor
            </CheckBox>
            <CheckBox
              value="mentee"
              type="radio"
              checked={selectedRole === "mentee"}
              onChange={handleRoleChange}
            >
              Mentee
            </CheckBox>
            <Dropdown
              options={COUNTRY.map((country) => country.name)}
              selected={selectedOption}
              onSelectedChange={handleOptionChange}
            />
            <Button color="orange" size="xl">
              Sign Up
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default SignupForm;
