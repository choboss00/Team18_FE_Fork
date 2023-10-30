import Title from "../atoms/Title";
import { Link } from "react-router-dom";
import Button from "../../common/Button";

const KeyValueComponent = ({ keyName, value }) => (
  <div className="flex justify-between">
    <p className="text-green-700">
      <span className="material-symbols-outlined relative -bottom-1">
        check_circle
      </span>
      {keyName}
    </p>
    <p>{value}</p>
  </div>
);

const InformationForm = ({ data }) => {
  const userInfo = [
    {
      keyName: "Name",
      value: `${data?.user?.firstName || ""} ${data?.user?.lastName || ""}`,
    },
    { keyName: "Email", value: data?.user?.email },
    { keyName: "Age", value: data?.user?.age },
    { keyName: "TEL", value: data?.user?.phone },
    { keyName: "Country", value: data?.user?.country },
    { keyName: "bio", value: data?.user?.introduction },
    { keyName: "Role", value: data?.user?.role },
    { keyName: "Interests", value: data?.user?.categoryList.join(", ") },
  ];

  return (
    <div>
      <section className="p-10 border border-2 bg-white border-orange w-[500px]">
        <Title className="text-xl mb-5">
          My Information
          <img
            className="w-7 rounded-full inline-block mb-2 ml-2"
            src={data?.user?.profileImage}
            alt="Profile Image"
          ></img>
        </Title>
        {userInfo.map((item, index) => (
          <KeyValueComponent
            key={index}
            keyName={item.keyName}
            value={item.value}
          />
        ))}
      </section>

      <section className="mt-10 mb-10 p-10 border border-2 bg-white border-orange w-[500px]">
        <Title className="text-xl mb-5">Update Information</Title>
        <p className="text-gray-400">Go to Edit Information</p>
        <div className="relative w-full flex justify-end">
          <Button color="orange" size="sm">
            <Link to="/mypage/information/fix">Edit</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default InformationForm;
