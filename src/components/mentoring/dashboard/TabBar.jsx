import { tabState } from "../../../constants/mentoring";

export default function TabBar({ currentTab, setTab, postCounts }) {
  const handleTabClick = (tab) => {
    setTab(tab);
  };

  return (
    <div className="border-b-2 space-x-5">
      {Object.values(tabState).map((tab) => (
        <button
          key={`tab-${tab}`}
          className={`${
            tab === currentTab
              ? "text-orange border-orange border-b-2 "
              : "text-green-700 "
          }px-1 py-2 inline-flex justify-center items-center space-x-1`}
          onClick={() => {
            handleTabClick(tab);
          }}
        >
          <span className={tab === currentTab && "font-semibold"}>{tab}</span>
          <span className="px-[7px] rounded-full bg-pink-300 text-sm text-[#ffff]">
            {postCounts[`${tab.toLowerCase()}Count`]}
          </span>
        </button>
      ))}
    </div>
  );
}
