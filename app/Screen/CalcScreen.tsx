import React, { useState, useEffect } from "react";
import Button from "../Components/Button";
import Display from "../Components/Display";

const CalcScreen = () => {
  const [currentValue, setCurrentValue] = useState<string>("0");
  const [firstValue, setFirstValue] = useState<string | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [isChange, setIsChange] = useState<boolean>(false);

  // Audio instance
  let clickSound: HTMLAudioElement | null = null;

  useEffect(() => {
    if (typeof window !== "undefined") {
      clickSound = new Audio("/click-sound.wav");
    }
  }, []); // Initialize only once

  const playSound = () => {
    if (clickSound) {
      clickSound.currentTime = 0; // Reset for successive clicks
      clickSound.play();
    }
  };

  const acHandler = () => {
    playSound();
    setCurrentValue("0");
    setFirstValue(null);
    setOperator(null);
  };

  const plusMinHandler = () => {
    playSound();
    setCurrentValue((Number(currentValue) * -1).toString());
  };

  const percentHandler = () => {
    playSound();
    if (!firstValue) {
      setCurrentValue((Number(currentValue) / 100).toString());
      return;
    }
    setCurrentValue(
      ((Number(firstValue) * Number(currentValue)) / 100).toString()
    );
  };

  const numberHandler = (value: string) => {
    playSound();
    if (isChange) {
      setFirstValue(currentValue);
      setIsChange(false);
      setCurrentValue(value);
    } else {
      setCurrentValue((prev) => (prev === "0" ? value : prev + value));
    }
  };

  const operatorHandler = (value: string) => {
    playSound();
    if (operator && firstValue) {
      equalHandler(); // Calculate the previous operation
    }
    setOperator(value);
    setFirstValue(currentValue);
    setIsChange(true);
  };

  const dotHandler = () => {
    playSound();
    if (currentValue.includes(".")) return;
    setCurrentValue((prev) => prev + ".");
  };

  const equalHandler = () => {
    playSound();
    if (!operator || !firstValue) return;

    const lastNumber = parseFloat(firstValue);
    const currentNumber = parseFloat(currentValue);
    let result = 0;

    switch (operator) {
      case "+":
        result = lastNumber + currentNumber;
        break;
      case "-":
        result = lastNumber - currentNumber;
        break;
      case "*":
        result = lastNumber * currentNumber;
        break;
      case "/":
        result = lastNumber / currentNumber;
        break;
      default:
        return;
    }

    setCurrentValue(result.toString());
    setFirstValue(null);
    setOperator(null);
    setIsChange(false);
  };

  return (
    <div className="flex flex-col items-center justify-between h-screen w-full bg-blue-300 sm:h-auto sm:w-1/2 lg:w-1/3 max-w-md rounded-2xl p-4 shadow-lg">
      {/* Display */}
      <div className="w-full h-full text-lg p-4 text-right overflow-hidden bg-purple-800 rounded-md mb-4">
        {/* Preview of current operation */}
        <div className="text-md text-gray-500">
          {firstValue} {operator} {isChange ? "" : currentValue}
        </div>
        {/* Current value */}
        <div className="text-3xl font-bold md:text-4xl text-black">
          <Display value={currentValue} />
        </div>
      </div>

      {/* Buttons Grid */}
      <div className="grid w-full grid-cols-4 gap-2 sm:gap-3">
        <Button value="AC" className="bg-gray-200" click={acHandler} />
        <Button value="+/-" className="bg-gray-200" click={plusMinHandler} />
        <Button value="%" className="bg-gray-200" click={percentHandler} />
        <Button
          value="/"
          className="bg-purple-400 text-white"
          click={() => operatorHandler("/")}
        />

        {["7", "8", "9"].map((num) => (
          <Button
            key={num}
            value={num}
            className="bg-purple-600 text-white"
            click={() => numberHandler(num)}
          />
        ))}
        <Button
          value="x"
          className="bg-purple-400 text-white"
          click={() => operatorHandler("*")}
        />

        {["4", "5", "6"].map((num) => (
          <Button
            key={num}
            value={num}
            className="bg-purple-600 text-white"
            click={() => numberHandler(num)}
          />
        ))}
        <Button
          value="-"
          className="bg-purple-400 text-white"
          click={() => operatorHandler("-")}
        />

        {["1", "2", "3"].map((num) => (
          <Button
            key={num}
            value={num}
            className="bg-purple-600 text-white"
            click={() => numberHandler(num)}
          />
        ))}
        <Button
          value="+"
          className="bg-purple-400 text-white"
          click={() => operatorHandler("+")}
        />

        <Button
          value="0"
          className="col-span-2 bg-purple-600 text-white"
          click={() => numberHandler("0")}
        />
        <Button
          value="."
          className="bg-purple-600 text-white"
          click={dotHandler}
        />
        <Button
          value="="
          className="bg-purple-800 text-white"
          click={equalHandler}
        />
      </div>
    </div>
  );
};

export default CalcScreen;
