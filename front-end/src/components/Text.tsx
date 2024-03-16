"use client";
import { quotes } from "@/utils/quotes";
import { useEffect, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { GoDotFill } from "react-icons/go";

export default function Text({ isTextOn }: { isTextOn: boolean }) {
  const [quote, setQuote] = useState(quotes[0]);
  const [type, setType] = useState("");
  const [counter, setCounter] = useState(0);
  const [truthList, setTruthList] = useState<boolean[]>([]);
  const [time, setTime] = useState<number>(0.0);
  let randomQuouteNum: number;

  useHotkeys("*", (event, handler) => {
    console.log(isTextOn);
    if (!isTextOn) {
      event.preventDefault();
      if (event.key.length === 1) setType((prev) => prev + event.key);
    }
  });

  useEffect(() => {
    randomQuouteNum = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[randomQuouteNum]);
  }, []);

  useEffect(() => {
    const textLetters = quote.quote.split("");
    const typeLetters = type.split("");

    if (textLetters.length >= typeLetters.length) {
      if (typeLetters.length === 0) return;
      let updatedTruthList = [...truthList];
      updatedTruthList[counter] = textLetters[counter] === typeLetters[counter];

      setTruthList(updatedTruthList);
    }
    if (typeLetters[counter] !== undefined) {
      setCounter(counter + 1);
    }
  }, [type]);

  function resetState() {
    setQuote(quotes[randomQuouteNum]);
    setType("");
    setCounter(0);
    setTruthList([]);
    setTime(0.0);
  }

  return (
    <div className="w-full  px-10 flex flex-col cursor-default  max-w-4xl mx-auto items-start gap-12 justify-center mt-16 ">
      <div className="text-2xl">
        {quote.quote.split("").map((letter, i) => {
          let className = "text-secondary text-2xl leading-normal ";
          if (truthList[i] === true)
            className = `text-correct 
          `;
          // ${letter === " " ? "border-b-2  w-10 border-green-500" : ""}
          if (truthList[i] === false)
            className = `text-wrong 
          `;
          // ${letter === " " ? "border-b-2  w-10 border-red-500" : ""}
          if (i === counter) className += "blinking-cursor";
          return (
            <span key={i} className={className}>
              {letter}
            </span>
          );
        })}
      </div>
      <div className="flex text-lg gap-4 items-center text-secondary ">
        <span>{quote.owner.name}</span>
        <GoDotFill size={10} />
        <span>{quote.owner.title}</span>
      </div>
    </div>
  );
}
