import { useAtomValue } from "jotai";
import { useNavigate, Outlet } from "react-router-dom";

import { userAtom } from "../store/index";
import { useEffectOnce } from "../hooks/useEffectOnce";

export default function MentorCheck() {
  const user = useAtomValue(userAtom);
  const navigate = useNavigate();

  useEffectOnce(() => {
    if (user.role !== "user") {
      alert("해당 서비스는 멘토만 접근할 수 있습니다.");
      navigate("mentoring/posts", { replace: true });
    }
  });

  return user && <Outlet />;
}
