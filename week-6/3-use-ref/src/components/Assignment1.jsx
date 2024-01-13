import { useEffect, useRef } from "react";

// Create a component with a text input field and a button. When the component mounts or the button is clicked, automatically focus the text input field using useRef.

export function Assignment1() {
  const text = useRef();
  useEffect(() => {
    text.current.focus();
  }, [text]);

  const handleButtonClick = () => {
    text.current.focus();
  };

  return (
    <div>
      <input ref={text} type="text" placeholder="Enter text here" />
      <button onClick={handleButtonClick}>Focus Input</button>
    </div>
  );
}
