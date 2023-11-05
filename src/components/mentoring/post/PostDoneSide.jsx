import { convertDateToAge } from "../../../utils/age";

import FlagTag from "../../common/FlagTag";
import Tag from "../../common/Tag";

export default function PostDoneSide({ data }) {
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
            </div>
          </div>
        </div>
        {/* 중단 멘토링 내용 */}
        <div className="mb-8 px-6 py-12 bg-white">{data.content}</div>
        {/* 하단 멘토링 신청자 목록 */}
        <table className="text-center">
          <thead>
            <tr className="bg-gray-100 border">
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
      </div>
    </div>
  );
}
