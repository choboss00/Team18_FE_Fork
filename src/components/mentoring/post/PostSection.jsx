import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { getPostReq, getUser } from "../../../apis/mentoring/post";
import { RoleType } from "../../../constants/user";

import PostDoneSide from "./PostDoneSide";
import PostMenteeSide from "./PostMenteeSide";
import PostMentorSide from "./PostMentorSide";

export default function PostSection() {
  const { postId } = useParams();
  const auth = window.localStorage.getItem("isLogin");

  const { data: userData } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    enabled: !!auth,
  });

  const { data } = useQuery({
    queryKey: ["post", postId],
    queryFn: () => getPostReq(postId),
  });

  return data.data.response.state === "done" ? (
    <PostDoneSide data={data.data.response} />
  ) : !auth || userData.data.response.role === RoleType.MENTEE ? (
    <PostMenteeSide data={data.data.response} />
  ) : (
    <PostMentorSide data={data.data.response} />
  );
}
