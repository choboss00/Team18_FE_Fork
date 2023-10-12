import InputBox from "../atoms/InputBox";
import Button from "../../common/Button";
import Dropdown from "../../common/Dropdown";
import { useState } from "react";
import COUNTRIES from "../constants/COUNTRY";
import useValidation from "../hooks/useValidation";

const SignupForm = ({ inputProps }) => {
  const [selectedOption, setSelectedOption] = useState("the United States");

  const handleOptionChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="w-[500px]">
          <div className="flex gap-10">
            {inputProps
              .filter(
                (props) => props.id === "FirstName" || props.id === "LastName"
              )
              .map((inputField) => {
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
          </div>
          {inputProps
            .filter(
              (inputField) =>
                inputField.id !== "FirstName" && inputField.id !== "LastName"
            )
            .map((inputField) => {
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
          <Dropdown
            options={COUNTRIES.map((index) => index.name)}
            selected={selectedOption}
            onSelectedChange={handleOptionChange}
          />

          <Button color="orange" size="xl">
            Sign Up
          </Button>
        </div>
      </form>
    </>
  );
};

export default SignupForm;
