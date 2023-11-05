import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { deletePostReq, donePostReq } from "../../../apis/mentoring/post";
import {
  acceptConnectionReq,
  refuseConnectionReq,
} from "../../../apis/mentoring/connetion";
import { convertDateToAge } from "../../../utils/age";

import Button from "../../common/Button";
import FlagTag from "../../common/FlagTag";
import Tag from "../../common/Tag";

export default function PostMentorSide({ data }) {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const isMine = `${data.writer.uid}` === window.localStorage.getItem("uid");

  const isDelete = !data.connections.some(
    (connection) => connection.state !== "await"
  );

  const [checks, setchecks] = useState(
    data.connections.reduce((acc, connection) => {
      if (connection.state === "await")
        return { ...acc, [connection.cid]: false };
      else return acc;
    }, {})
  );

  const handleCheckBoxChenage = (e) => {
    const name = e.target.name;
    if (name === "all") {
      if (Object.keys(checks).every((val) => checks[val] === true))
        setchecks(
          Object.keys(checks).reduce(
            (acc, key) => ({ ...acc, [key]: false }),
            {}
          )
        );
      else
        setchecks(
          Object.keys(checks).reduce(
            (acc, key) => ({ ...acc, [key]: true }),
            {}
          )
        );
    } else {
      setchecks((prev) => ({ ...prev, [name]: !prev[name] }));
    }
  };

  const { mutate: deleteMutate } = useMutation({ mutationFn: deletePostReq });

  const { mutate: doneMutate } = useMutation({ mutationFn: donePostReq });

  const { mutate: acceptMutate } = useMutation({
    mutationFn: acceptConnectionReq,
  });

  const { mutate: refuseMutate } = useMutation({
    mutationFn: refuseConnectionReq,
  });

  const handleEditlClick = () => {
    navigate(`/mentoring/edit/${data.pid}`);
  };

  const handleDeleteClick = () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      deleteMutate(data.pid, {
        onSuccess: () => {
          toast("Successfully deleted.");
          queryClient.invalidateQueries({ queryKey: ["posts"] });
          navigate("/mentoring/posts");
        },
      });
    }
  };

  const handleDoneClick = () => {
    if (window.confirm("Are you sure you want to close this post?"))
      doneMutate(data.pid, {
        onSuccess: () => {
          toast("Successfully closed.");
          queryClient.invalidateQueries({ queryKey: ["posts"] });
        },
      });
  };

  const handleAcceptClick = () => {
    if (Object.values(checks).some((val) => val))
      if (window.confirm("Are you sure you want to accept mentees?"))
        acceptMutate(
          Object.keys(checks).reduce((acc, key) => {
            if (checks[key] === true) return [...acc, key];
            else return [...acc];
          }, []),
          {
            onSuccess: () => {
              toast("Successfully accepted.");
              queryClient.invalidateQueries({ queryKey: ["post", data.pid] });
            },
          }
        );
  };

  const handleRefuseClick = () => {
    if (Object.values(checks).some((val) => val))
      if (window.confirm("Are you sure you want to refuse mentees?"))
        refuseMutate(
          Object.keys(checks).reduce((acc, key) => {
            if (checks[key] === true) return [...acc, key];
            else return [...acc];
          }, []),
          {
            onSuccess: () => {
              toast("Successfully refused.");
              queryClient.invalidateQueries({ queryKey: ["post", data.pid] });
            },
          }
        );
  };

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-[58rem] m-12 flex flex-col">
        {/* 상단 - 멘토 정보 및 멘토링 제목 */}
        <div className="w-full h-fit flex">
          <img
            className="w-56 p-8 rounded-full"
            src={data.writer.profileImage}
            alt={`작성자 프로필 이미지`}
          ></img>
          <div className="w-full px-4 flex flex-col justify-center space-y-3">
            <h1 className="text-4xl font-bold text-green-700">{data.title}</h1>
            <span className="text-sm text-gray-500">{`${data.writer.firstName} ${data.writer.lastName}`}</span>
            <div className="pr-4 flex justify-between items-center">
              <span className="flex items-center space-x-2">
                <FlagTag>{data.writer.country}</FlagTag>
                <Tag>Mentor</Tag>
                {data.writer.interest.map((val, index) => (
                  <Tag key={`writertag-${index}`}>{val}</Tag>
                ))}
              </span>
              {isMine && (
                <span className="space-x-2">
                  <Button color="white" size="base" onClick={handleEditlClick}>
                    Edit
                  </Button>
                  <Button
                    color="white"
                    size="base"
                    onClick={isDelete ? handleDeleteClick : handleDoneClick}
                  >
                    {isDelete ? "Delete" : "Done"}
                  </Button>
                </span>
              )}
            </div>
          </div>
        </div>
        {/* 중단 멘토링 내용 */}
        <div className="mb-8 px-6 py-12 bg-white">{data.content}</div>
        {/* 하단 멘토링 신청자 목록 */}
        <table className="text-center">
          <thead>
            <tr className="bg-gray-100 border">
              <th>
                <input
                  type="checkbox"
                  name="all"
                  checked={Object.values(checks).every((val) => val === true)}
                  onChange={handleCheckBoxChenage}
                />
              </th>
              <th className="p-2 text-left font-medium">Name</th>
              {["Country", "Favorite", "Age", "State"].map((val) => (
                <th key={`table-${val}`} className="font-medium">
                  {val}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.connections.map((value, index) => (
              <tr key={`mentee-${index}`} className="bg-white border">
                <td>
                  <input
                    type="checkbox"
                    name={value.cid}
                    checked={checks[value.cid]}
                    onChange={handleCheckBoxChenage}
                    disabled={value.state !== "await"}
                  />
                </td>
                <td className="p-2 text-left space-x-2">
                  <img
                    className="inline w-8 rounded-full"
                    src={value.mentee.profileImage}
                    alt={`${value.mentee.uid} 프로필 이미지`}
                  ></img>
                  <span className="font-medium">{`${value.mentee.firstName} ${value.mentee.lastName}`}</span>
                </td>
                <td>
                  <FlagTag>{value.mentee.country}</FlagTag>
                </td>
                <td className="space-x-2">
                  {value.mentee.interest.map((val, index) => (
                    <Tag key={`menteetag-${index}`}>{val}</Tag>
                  ))}
                </td>
                <td>
                  <Tag>{convertDateToAge(value.mentee.birthDay) + ""}</Tag>
                </td>
                <td>
                  <Tag>{value.state}</Tag>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* 최하단 멘토링 신청자 관리 */}
        <div className="mt-4 text-right space-x-2">
          <Button color="orange" size="sm" onClick={handleAcceptClick}>
            Accept
          </Button>
          <Button color="orange" size="sm" onClick={handleRefuseClick}>
            Refuse
          </Button>
        </div>
      </div>
    </div>
  );
}
