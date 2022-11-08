import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import {BsChatLeftText} from "react-icons/bs";

const BestantListTable = ({FirmaKurz,ZustBerater,Bank,RegioBereich,FBKBank,MA,PStatus,Note, printing}) => {

    String.prototype.allReplace = function(obj) {
        let retStr = this;
        for (const x in obj) {
            retStr = retStr.replace(new RegExp(x, 'g'), obj[x]);
        }
        return retStr;
    };

    return (
        <tr className="border-y border-silver border-x-0 text-sm">
            <td className="w-2/12 text-sm text-mainBlue underline font-light px-6">
                <Link to={`/firmenprojekte/${FirmaKurz.allReplace({'/': '%2F', ' ': '_'})}`} target="_blank">
                    {FirmaKurz}
                </Link>
            </td>
            <td className="w-2/12 text-gray-900 font-light px-6">
                {ZustBerater}
            </td>
            <td className="w-2/12 text-gray-900 font-light px-6 ">
                {Bank}
            </td>
            <td className="w-2/12 text-gray-900 font-light px-6">
                {RegioBereich}
            </td>
            <td className="w-3/12 text-gray-900 font-light px-6 ">
                {FBKBank}
            </td>
            <td className="w-1/12 text-gray-900 font-light px-6">
                {MA}
            </td>
            <td className="w-2/12 text-gray-900 font-light px-6 ">
                {PStatus}
            </td>
            <td className="w-1/12 px-6 whitespace-nowrap font-light text-gray-900">
                21.10.22
            </td>
            <td hidden={printing} className="w-1/12 tooltip text-gray-900 font-light px-6">
                <BsChatLeftText size='18px'/>
                <span className={`${Note ? 'tooltiptext' : 'hidden'}`}>
                    {Note}
                </span>
            </td>
        </tr>
    )
}

export default BestantListTable