"use client";
import { useState } from "react";
import { Icons } from "shared/components/Icons";

export const RatingClicker = () => {
  const [count, setCount] = useState(0);
  return (
    <div className="w-max text-2xl ipad:text-5xl content-center grid">
      <div
        className="cursor-pointer p-2 px-6 hover:opacity-60 transition"
        onClick={() => {
          setCount(count + 1);
        }}
      >
        <i className="ph-bold ph-arrow-circle-up"></i>
      </div>
      <div className="text-xl flex justify-center py-1 ipad:text-2xl">
        {count}
      </div>
      <div
        className="cursor-pointer p-2 px-6 hover:opacity-60 transition"
        onClick={() => {
          setCount(count - 1);
        }}
      >
        <i className="ph-bold ph-arrow-circle-down"></i>
      </div>
    </div>
  );
};

export const RatingClicker2 = () => {
  const [count, setCount] = useState(0);
  const [IconWeight, SetIconWeight] = useState("bold");
  const [IconWeight2, SetIconWeight2] = useState("bold");
  const [buttonClicked, setButtonClicked] = useState(false);
  const [buttonClicked2, setButtonClicked2] = useState(false);
  const HandleLike = () => {
    if (buttonClicked2 == true) {
      setCount(count + 2);
      SetIconWeight("fill");
      setButtonClicked(true);
      SetIconWeight2("bold");
      setButtonClicked2(false);
    } else if (!buttonClicked) {
      setCount(count + 1);
      SetIconWeight("fill");
      setButtonClicked(true);
      SetIconWeight2("bold");
      setButtonClicked2(false);
    }
  };
  const HandleDislike = () => {
    if (buttonClicked == true) {
      setCount(count - 2);
      SetIconWeight("bold");
      setButtonClicked(false);
      SetIconWeight2("fill");
      setButtonClicked2(true);
    } else if (!buttonClicked2) {
      setCount(count - 1);
      SetIconWeight2("fill");
      setButtonClicked2(true);
      SetIconWeight("bold");
      setButtonClicked(false);
    }
  };

  return (
    <div className="border-r border-base-content/20">
      <div className="flex justify-center h-14 ">
        <div className="my-auto text-xl">{count}</div>
      </div>

      <div className="flex border-t border-base-content/20 h-14">
        <div
          className="grid place-content-center w-14 cursor-pointer hover:opacity-60 transition border-r border-base-content/20"
          onClick={HandleLike}
        >
          <Icons variant="thumbs-up" weight={IconWeight as "bold"} size="5" />
        </div>
        <div
          className="grid place-content-center w-14 cursor-pointer hover:opacity-60 transition"
          onClick={HandleDislike}
        >
          <Icons
            variant="thumbs-down"
            weight={IconWeight2 as "bold"}
            size="5"
          />
        </div>
      </div>
    </div>
  );
};
