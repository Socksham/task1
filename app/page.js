'use client'

import Image from "next/image";
import MapOne from "../components/MapOne";
import MapTwo from "@/components/Map/Map";
import { useEffect, useState, useRef } from "react";
import { Tooltip } from "react-tooltip";
import MapChart from "@/components/MapChart";
import ReactDOM from "react-dom";
import CompleteMap from "@/components/Map/CompleteMap";

export default function Home() {
  
  return (
    <div>
      <CompleteMap activeColor={"#065f46"} defaultColor={"#d1d5db"} hoverColor={"#e2f3eb"} />
    </div>
  );
}