'use client'

import React, { useState, useEffect, memo } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { scaleQuantile } from "d3-scale";
import { csv } from "d3-fetch";

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

const MapChart = ({ setContent, setInset }) => {
    return (
        <div>
            <div className="flex items-center space-x-2 justify-end">
                <div className="w-[16px] h-[16px] bg-green-700 rounded-full" />
                <p>Active States</p>
                <div className="w-[16px] h-[16px] bg-gray-300 rounded-full" />
                <p>Inactive States</p>
            </div>
            <ComposableMap projection="geoAlbersUsa">
                <Geographies geography={geoUrl}>
                    {({ geographies }) =>
                        geographies.map(geo => {
                            console.log(geo)
                            return (
                                <Geography
                                    key={geo.rsmKey}
                                    geography={geo}
                                    strokeWidth={4}
                                    style={{
                                        default: { fill: "#d1d5db" },
                                        hover: { fill: "#166534" },
                                        pressed: { fill: "#166534" },
                                    }}
                                    className="outline-none"
                                    onMouseEnter={() => {
                                        setContent(`${geo.properties.name}`);
                                    }}
                                    onMouseLeave={() => {
                                        setContent("");
                                    }}
                                />
                            );
                        })
                    }
                </Geographies>
            </ComposableMap>
        </div>

    );
};

export default memo(MapChart);