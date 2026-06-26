"use client";
import { useEffect, useRef, useState } from "react";

const OTP_INPUT_SIZE = 6;

function InputOTP() {
  const [inputArr, setInputArr] = useState(new Array(OTP_INPUT_SIZE).fill(""));

  const refArr = useRef<(null | HTMLInputElement)[]>([]);

  useEffect(() => {
    refArr.current[0]?.focus();
  }, []);

  function handleInputBox(value: string, index: number) {
    if (isNaN(Number(value))) {
      return;
    }
    let newArray = [...inputArr];
    newArray[index] = value.trim().slice(-1);
    setInputArr(newArray);

    value.trim() && refArr.current[index + 1]?.focus();
  }

  function handleKeyDown(
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) {
    if (!e.currentTarget.value && e.key === "Backspace") {
      refArr.current[index - 1]?.focus();
    }

    if (e.key === "ArrowLeft") {
      const input = refArr.current[index - 1];

      if (!input) return;

      input.focus();

      requestAnimationFrame(() => {
        const len = input.value.length;
        input.setSelectionRange(len, len);
      });
    }

    if (e.key === "ArrowRight") {
      refArr.current[index + 1]?.focus();
    }
  }

  return (
    <div className="w-full flex justify-center mt-24">
      <div className="flex gap-1">
        {inputArr.map((input, index) => (
          <input
            className="border size-10 text-center"
            type="text"
            key={index}
            value={input}
            ref={(input) => {
              refArr.current[index] = input;
            }}
            onChange={(e) => handleInputBox(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
          />
        ))}
      </div>
    </div>
  );
}

export default InputOTP;
