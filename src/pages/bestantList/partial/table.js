import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import {BsChatLeftText} from "react-icons/bs";

const BestantListTable = ({FirmaKurz,ZustBerater,Bank, index,RegioBereich,FBKBank,MA,PStatus,Note}) => {

    String.prototype.allReplace = function(obj) {
        let retStr = this;
        for (const x in obj) {
            retStr = retStr.replace(new RegExp(x, 'g'), obj[x]);
        }
        return retStr;
    };

    return (
        <tr className="border-y border-silver border-x-0 ">
            {/*<td className="px-6 py-4 whitespace-nowrap text-xs font-medium text-gray-900">{index+1}</td>*/}
            <td className="w-3/12 text-xs text-mainBlue underline font-light px-6 py-4 whitespace-pre-wrap">
                <Link to={`/bestant/${FirmaKurz.allReplace({'/': '%2F', ' ': '_'})}`}>
                    {FirmaKurz}
                </Link>
            </td>
            <td className="w-3/12 text-xs text-gray-900 font-light px-6 py-4 whitespace-pre-wrap">
                {ZustBerater}
            </td>
            <td className="w-2/12 text-xs text-gray-900 font-light px-6 py-4 whitespace-pre-wrap">
                {Bank}
            </td>
            <td className="w-2/12 text-xs text-gray-900 font-light px-6 py-4 whitespace-pre-wrap">
                {RegioBereich}
            </td>
            <td className="w-3/12 text-xs text-gray-900 font-light px-6 py-4 whitespace-pre-wrap">
                {FBKBank}
            </td>
            <td className="w-1/12 text-xs text-gray-900 font-light px-6 py-4 whitespace-pre-wrap">
                {MA}
            </td>
            <td className="w-1 text-xs text-gray-900 font-light px-6 py-4 whitespace-pre-wrap">
                {PStatus}
            </td>
            <td className="w-1 tooltip text-xs text-gray-900 font-light px-6 py-4 whitespace-pre-wrap">
                <BsChatLeftText size='18px'/>
                <span className='tooltiptext'>
                    {Note}
                </span>
            </td>
            <td className="w-1  text-xs text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                <h2 className='border border-mainBlue text-mainBlue rounded-3xl px-2 py-1 font-bold uppercase'>
                    <Link to={`/bestant/${FirmaKurz.allReplace({'/': '%2F', ' ': '_'})}`}>
                        Edit
                    </Link>
                </h2>
            </td>
        </tr>
    )
}

export default BestantListTable