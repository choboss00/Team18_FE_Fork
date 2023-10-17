import { instance } from "./instance";
import { mockUsers, mockResponse } from "../components/account/mockUser";

// api 요청
export const register = (data) => {
  const { firstName, lastName, email, password, role, country, interest } =
    data;
  return instance.post("/signup", {
    firstName,
    lastName,
    email,
    password,
    role,
    country,
    interest,
  });
};

// export const login = (data) => {
//   const { email, password } = data;
//   return instance.post("/login", {
//     email,
//     password,
//   });
// };

export const login = async (data) => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  // 사용자의 email이 mock data의 key 값과 일치하면
  const user = mockUsers[data.email];
  // 패스워드 일치 확인
  if (user && user.password === data.password) {
    const responseUser = {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      country: user.country,
      interest: user.interest,
    };
    return mockResponse({
      message: "Login successful",
      user: responseUser,
    });
  } else {
    return mockResponse({
      message: "Invalid email or password",
      success: false,
    });
  }
};
