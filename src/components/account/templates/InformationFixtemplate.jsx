import InformationFixForm from "../organisms/InformationFixForm";
import { userInfo } from "../../../apis/mypage";
import { useQuery } from "@tanstack/react-query";
import { EDIT } from "../constants/SIGNUP";
import Title from "../atoms/Title";
const InformationFixtemplate = () => {
  const { data } = useQuery(["userInfo"], userInfo, {
    suspense: true,
  });

  return (
    <>
      <main className="mt-20 mb-10 justify-center items-center flex flex-col">
        <Title>Edit Personal Information</Title>
        <InformationFixForm inputProps={EDIT} data={data} />
      </main>
    </>
  );
};

export default InformationFixtemplate;
