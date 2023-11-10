import axios from "axios";
import Error from "../components/common/Error";
const REFRESH_URL = "/users/refresh";

axios.defaults.withCredentials = true;

// instance 생성

export const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 1000 * 5,
});

// 요청 인터셉터 설정
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `${token.replace(/"/g, "")}`;
    } else {
      console.log("해당 요청에는 token이 담기지 않았습니다.");
    }
    return config;
  },
  (error) => {
    console.log(`[API REQEST ERROR] ${error}`);
    console.dir(error);
    return Promise.reject(error);
  }
);

// 응답 인터셉터 설정
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config, response } = error;
    if (
      response &&
      response.status === 401 &&
      config.url !== REFRESH_URL &&
      !config._retry
    ) {
      config._retry = true;
      try {
        const { data } = await instance.get(REFRESH_URL);
        if (data?.status === "success") {
          //1. 응답의 헤더에서 재발급 된 액세스 토큰 꺼내기
          //2. 기존의 로컬 스토리지에 있는 토큰을 지우고, 재발급 받은 액세스 토큰을 저장
          //3. 새로 저장한 토큰을 스토리지에서 꺼내서 다시 요청 보내기

          const accessToken = data?.headers?.authorization || null;
          localStorage.setItem("token", accessToken);
          config.headers["Authorization"] = `${accessToken.replace(/"/g, "")}`;
          return instance(config);
        } else if (data?.status === "error") {
          // 토스트로 로그인 시간이 만료되었습니다. 다시 로그인 후 시도해주세요
          // 강제 로그아웃
          // 로그인 페이지로 리다이렉트
          // Refresh Token 실패시 (리프레쉬 토큰 만료 등)로그아웃 등의 처리가 필요
          // dispatch(ueslogout());
          console.log(data?.message);
          return Promise.reject(new Error("Refresh authentication failed"));
        }
      } catch (refreshError) {
        // Refresh Token 요청 중 에러 처리
        // 적절한 피드백을 제공하거나 애플리케이션 상태를 변경
        return Promise.reject(refreshError);
      }
    } else {
      if (error.response) {
        const errorCode = error.response.status;
        const errorState = ["Redirect", "Client", "Server"][
          Math.floor(errorCode / 100) - 3
        ];
        console.error(
          `[API RESPONSE ERROR] ${errorCode}(${errorState}): ${error.message}`
        );
      } else {
        console.error(`[API RESPONSE ERROR] ${error}`);
      }

      return Promise.reject(error);
    }
  }
);
