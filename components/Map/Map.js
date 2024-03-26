'use client'

import React, { useState, useEffect, memo } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { scaleQuantile } from "d3-scale";
import { csv } from "d3-fetch";

const MapChart = ({ setContent, setInset }) => {

    const activeStates = ["Montana", "California", "Pennsylvania"]

    const geoUrl = "/states.json";

    return (
        <div className="">
            <ComposableMap projection="geoAlbersUsa">
                <Geographies geography={geoUrl}>
                    {({ geographies }) =>
                        geographies.map(geo => {
                            console.log(geo)
                            if (activeStates.includes(geo.properties.name)) {
                                return (
                                    <Geography
                                        key={geo.rsmKey}
                                        geography={geo}
                                        strokeWidth={4}
                                        style={{
                                            default: { fill: "#065f46" },
                                            hover: { fill: "#065f46" },
                                            pressed: { fill: "#065f46" },
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
                            } else {
                                return (
                                    <Geography
                                        key={geo.rsmKey}
                                        geography={geo}
                                        strokeWidth={4}
                                        style={{
                                            default: { fill: "#d1d5db" },
                                            hover: { fill: "#d1d5db" },
                                            pressed: { fill: "#d1d5db" },
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
                            }

                        })
                    }
                </Geographies>
            </ComposableMap>
        </div>

    );
};

export default memo(MapChart);