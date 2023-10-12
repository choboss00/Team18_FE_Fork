import { useState } from "react";

const useValidation = (initialValue, regex) => {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState(false);

  // 유효성 검사에 따른 커스텀 디자인 필요, submit button disabled 처리
  const validate = (value) => {
    if (!value) {
      setError(true);
      return;
    }
    setError(!regex.test(value));
  };

  const handleChange = (event) => {
    setValue(event.target.value);
    validate(event.target.value);
  };

  return { value, error, handleChange };
};

export default useValidation;
