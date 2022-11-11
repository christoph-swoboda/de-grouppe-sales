import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import {BsChatLeftText} from "react-icons/bs";

const FirmenprojekteView = ({FirmaKurz,ZustBerater,Bank,RegioBereich,FBKBank,MA,PStatus,Note, printing}) => {

    String.prototype.allReplace = function(obj) {
        let retStr = this;
        for (const x in obj) {
            retStr = retStr.replace(new RegExp(x, 'g'), obj[x]);
        }
        return retStr;
    };

    return (
        <tr className="border-y border-silver border-x-0 text-sm">
            <td className="w-40 text-sm text-mainBlue underline font-light px-6">
                <Link to={`/firmenprojekte/${FirmaKurz.allReplace({'/': '%2F', ' ': '_'})}`} target="_blank">
                    {FirmaKurz}
                </Link>
            </td>
            <td className="w-40 text-gray-900 font-light px-6">
                {ZustBerater}
            </td>
            <td className="w-40 text-gray-900 font-light px-6 ">
                {Bank}
            </td>
            <td className="w-40 text-gray-900 font-light px-6">
                {RegioBereich}
            </td>
            <td className="w-40 text-gray-900 font-light px-6 ">
                {FBKBank}
            </td>
            <td className="w-16 text-gray-900 font-light px-6">
                {MA}
            </td>
            <td className="w-40 text-gray-900 font-light px-6 ">
                {PStatus}
            </td>
            <td className="w-24 px-6 font-light text-gray-900">
                21.10.22
            </td>
            <td hidden={printing} className="w-16 tooltip text-gray-900 font-light px-6">
                <BsChatLeftText size='16px'/>
                <span className={`${Note ? 'tooltiptext' : 'hidden'}`}>
                    {Note}
                </span>
            </td>
        </tr>
    )
}

export default FirmenprojekteView