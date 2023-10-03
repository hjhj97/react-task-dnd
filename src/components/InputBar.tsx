import React, { useRef } from "react";

type InputBarProps = {
  addTask: (text: string) => void;
};

function InputBar({ addTask }: InputBarProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    if (!inputRef.current) return;
    addTask(inputRef.current!.value);
    inputRef.current.value = "";
  };
  return (
    <div className="input-wrapper">
      <input type="text" ref={inputRef} onKeyDown={(e) => e.key === "Enter" && handleClick()} />
      <button onClick={handleClick}>Add</button>
    </div>
  );
}

export default InputBar;
