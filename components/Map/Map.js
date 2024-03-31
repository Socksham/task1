'use client'

import React, { useState, useEffect, memo } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { scaleQuantile } from "d3-scale";
import { csv } from "d3-fetch";

const MapChart = ({ setContent, hoverColor, activeColor, defaultColor }) => {

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
                                        stroke="#FFF"
                                        strokeWidth={0.5}
                                        style={{
                                            default: { fill: activeColor },
                                            hover: { fill: activeColor },
                                            pressed: { fill: activeColor },

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
                                        stroke="#FFF"
                                        strokeWidth={0.5}
                                        style={{
                                            default: { fill: defaultColor },
                                            hover: { fill: hoverColor },
                                            pressed: { fill: hoverColor },
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