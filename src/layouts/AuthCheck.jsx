import { Outlet, useNavigate } from "react-router-dom";
import { useEffectOnce } from "../hooks/useEffectOnce";

export default function AuthCheck() {
  const navigate = useNavigate();

  useEffectOnce(() => {
    if (!window.localStorage.getItem("token"))
      if (window.confirm("로그인이 필요한 서비스입니다.\n로그인 하시겠습니까?"))
        navigate("/users/login", { replace: true });
      else navigate(-1);
  });

  return <Outlet />;
}
