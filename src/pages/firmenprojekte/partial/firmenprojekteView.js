import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import {BsChatLeftText} from "react-icons/bs";
import {AES} from "crypto-js";
import {useStateValue} from "../../../states/StateProvider";

const FirmenprojekteView = ({FirmaKurz,ZustBerater,Bank,RegioBereich,FBKBank,MA,PStatus,Note, printing, date, FirmaID, portal}) => {

    String.prototype.allReplace = function(obj) {
        let retStr = this;
        for (const x in obj) {
            retStr = retStr.replace(new RegExp(x, 'g'), obj[x]);
        }
        return retStr;
    };

    const [{secretKey}] = useStateValue();

    return (
        <tr className="border-y border-silver border-x-0 text-sm">
            <td className="w-40 text-sm text-mainBlue underline font-light pr-3">
                <Link
                    to={{
                        pathname: `/firmenprojekte/${portal}/${FirmaID}`,
                    }}
                    target='_blank'
                >
                    {FirmaKurz}
                </Link>
            </td>
            <td className={`${portal==='dgg'? 'w-72': 'w-40'} text-gray-900 font-light pr-3`}>
                {ZustBerater}
            </td>
            <td className={`${portal==='dgg'? 'w-16': 'w-40'} text-gray-900 font-light pr-3`}>
                {Bank}
            </td>
            <td className="w-40 text-gray-900 font-light pr-3">
                {RegioBereich}
            </td>
            <td className="w-40 text-gray-900 font-light pr-3 ">
                {FBKBank}
            </td>
            <td className="w-16 text-gray-900 font-light pr-3">
                {MA}
            </td>
            <td className="w-40 text-gray-900 font-light pr-3 ">
                {PStatus}
            </td>
            {
                portal==='r+v' &&
                <td className="w-24 font-light text-gray-900 pr-3">
                    {date}
                </td>
            }
            <td hidden={printing} className="w-16 tooltip text-gray-900 font-light pr-3">
                <BsChatLeftText size='16px'/>
                <span className={`${Note ? 'tooltiptext' : 'hidden'}`}>
                    {Note}
                </span>
            </td>
        </tr>
    )
}

export default FirmenprojekteView