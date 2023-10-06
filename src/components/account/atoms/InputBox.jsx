const InputBox = (props) => {
  return (
    <>
      <label>
        {props.label}
        <input
          id={props.id}
          type={props.type}
          value={props.value}
          placeholder={props.placeholder}
          className="mt-4 mb-4 p-4 w-[100%] text-base"
        ></input>
      </label>
    </>
  );
};

export default InputBox;
