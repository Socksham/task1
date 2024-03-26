'use client'

import React from "react";
import ReactDOM from "react-dom";
import USA from "@svg-maps/usa";
import { SVGMap } from "react-svg-map";
import "@/app/map.css"

export default class MapOne extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <SVGMap map={USA} />
            </div>
        );
    }
}