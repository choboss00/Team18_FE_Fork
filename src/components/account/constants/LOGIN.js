const LOGIN = Object.freeze([
  {
    id: "email",
    label: "Email",
    type: "email",
    placeholder: "email address",
    variant: "filled",
    error: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
    //에러에 따라 메세지 처리
    // 1. 입력란이 비어있으면 안됩니다.
    // 2. 이메일은 영어 대소문자, 숫자, ._- 로만 이루어져야 합니다.
    msg: "이메일 에러 메세지",
  },
  {
    id: "password",
    label: "Password",
    type: "password",
    placeholder: "password",
    variant: "filled",
    error:
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_+=])[a-zA-Z0-9!@#$%^&*()\-_+=]{8,20}$/,
    //에러에 따라 메세지 처리
    // 1. 입력란이 비어있으면 안됩니다.
    // 2. 비밀번호는 영어 대소문자, 숫자, 특수문자를 모두 포함해야 합니다.
    // 3. 비밀번호는 8-20 이내여야 합니다.
    msg: "비번 에러 메세지",
  },
]);

export default LOGIN;
