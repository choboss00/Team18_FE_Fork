const tagType = {
  Sport: "bg-blue-500 text-white",
  Game: "bg-sky-500 text-white",
  BTS: "bg-red-500 text-white",
  Drama: "bg-yellow-500 text-white",
  Soccer: "bg-purple-500 text-white",
  "K-pop": "bg-pink-500 text-white",
  Baseball: "bg-rose-500 text-white",
  LOL: "bg-indigo-500 text-white",
  Youtuber: "bg-fuchsia-500 text-white",
  Mentor: "border-pink-400 text-pink-400 font-bold",
  Mentee: "border-green-500 text-green-500 font-bold",
};

const Tag = ({ children, ...props }) => {
  const tagStyle = `${
    tagType[children]
  } py-1 px-2 text-xs rounded-xl border-2 ${
    children.includes("Ment") ? "" : "border-[#0000]"
  }`;

  return (
    <span className={tagStyle} {...props}>
      {children}
    </span>
  );
};

export default Tag;
