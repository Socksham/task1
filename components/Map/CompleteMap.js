'use client'

import Map from "@/components/Map/Map";
import { useEffect, useState, useRef } from "react";

export default function CompleteMap({ activeColor, defaultColor, hoverColor }) {
  const [content, setContent] = useState("");
  const [topStyle, setTopStyle] = useState("")
  const [leftStyle, setLeftStyle] = useState("")
  const ref = useRef(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const handleResize = () => {
    const { offsetWidth, offsetHeight } = ref.current;
    setWidth(offsetWidth);
    setHeight(offsetHeight);
  }

  useEffect(() => {
    handleResize();
  }, [])

  useEffect(() => {
    window.addEventListener("resize", handleResize, false);
  }, [])

  useEffect(() => {
    const markers = {
      "California": {
        coordProps: [0.55, 0.12]
      },
      "Pennsylvania": {
        coordProps: [0.39, 0.83]
      },
      "Montana": {
        coordProps: [0.22, 0.33]
      }
    }

    const handleInset = (content) => {
      let markerContent = markers[content]
      if (markerContent) {
        let coordProps = markerContent["coordProps"]
        if (coordProps) {
          let top = Math.floor(height * coordProps[0]);
          let left = Math.floor(width * coordProps[1]);
          console.log(top, left)
          setTopStyle(top);
          setLeftStyle(left)
        }
      } else {
        setContent("")
      }
    }
    handleInset(content)
  }, [content, topStyle, leftStyle, height, width])

  return (
    <div className="p-4">
      <div className="flex items-center space-x-2 justify-end">
        <div className="w-[18px] h-[18px] bg-emerald-800 rounded-full" />
        <p className="text-lg text-gray-400">Active States</p>
        <div className="w-[18px] h-[18px] bg-gray-400 rounded-full" />
        <p className="text-lg text-gray-400">Inactive States</p>
      </div>
      <div className="">
        <div className="relative z-0" ref={ref}>
          <Map setContent={setContent} activeColor={activeColor} defaultColor={defaultColor} hoverColor={hoverColor} />
          <div className={`absolute pointer-events-none`} style={{
            top: `${topStyle}px`,
            left: `${leftStyle}px`
          }}>
            {
              content !== "" &&
              <div className="bg-white w-48 h-24 rounded-lg border py-2 px-4 shadow-lg transition-opacity ease-in duration-700 opacity-95 animate-fade">
                <p className="text-md text-gray-700 font-semibold p-0">{content}</p>
                <p className="text-md text-gray-500 p-0">Card Requests</p>
                <p className="text-xl font-bold text-green-700">15</p>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  );
}