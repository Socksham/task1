'use client'

import Image from "next/image";
import MapOne from "../components/MapOne";
import MapTwo from "@/components/MapTwo";
import { useEffect, useState, useRef } from "react";
import { Tooltip } from "react-tooltip";
import MapChart from "@/components/MapChart";
import ReactDOM from "react-dom";

export default function Home() {
  const [content, setContent] = useState("");
  const [topStyle, setTopStyle] = useState("200px")
  const [leftStyle, setLeftStyle] = useState("40px")
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
      "Illinois": {
        coordProps: [0.45, 0.64]
      },
      "New Mexico": {
        coordProps: [0.62, 0.33]
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
    <div>
      <div className="flex">
        <div className="w-1/2">
          <div className="relative z-0" ref={ref}>
            <MapTwo setContent={setContent} />
            <div className={`absolute pointer-events-none`} style={{
              top: `${topStyle}px`,
              left: `${leftStyle}px`
            }}>
              {
                content !== "" &&
                <div className="bg-white w-48 h-24 rounded-lg border py-2 px-4">
                  <p className="text-md text-gray-700 font-semibold p-0">{content}</p>
                  <p className="text-md text-gray-500 p-0">Card Requests</p>
                  <p className="text-xl font-bold text-green-700">15</p>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}