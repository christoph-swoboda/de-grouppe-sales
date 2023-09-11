import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import {BsChatLeftText} from "react-icons/bs";

const StrofalleTable = ({
                            FirmaKurz,
                            Firma,
                            ZustFKB,
                            Bank,
                            MA,
                            PStatus,
                            StorfallDatum,
                            Bemerkung,
                            PDatum,
                            FirmaID
                        }) => {

    String.prototype.allReplace = function (obj) {
        let retStr = this;
        for (const x in obj) {
            retStr = retStr.replace(new RegExp(x, 'g'), obj[x]);
        }
        return retStr;
    };

    return (
        <tr className="border-y border-silver border-x-0 text-sm">
            <td className="w-40 text-sm text-mainBlue underline font-light pr-3">
                <Link to={`/firmenprojekte/${FirmaID}`} target="_blank">
                    {FirmaKurz}
                </Link>
            </td>
            <td className="w-52 text-gray-900 font-light pr-3">
                {Firma}
            </td>
            <td className="w-40 text-gray-900 font-light pr-3">
                {ZustFKB}
            </td>
            <td className="w-40 text-gray-900 font-light pr-3 ">
                {Bank}
            </td>
            <td className="w-16 text-gray-900 font-light pr-3">
                {MA}
            </td>
            <td className="w-48 text-gray-900 font-light pr-3 ">
                {PStatus}
            </td>
            <td className="w-32 font-light text-gray-900 pr-3">
                {PDatum}
            </td>
            <td className="w-32 font-light text-gray-900 pr-3">
                {StorfallDatum}
            </td>
            <td className="w-16 tooltip text-gray-900 font-light ml-10 float-right">
                <BsChatLeftText size='16px'/>
                <span className={`${Bemerkung ? 'tooltiptextFixed' : 'hidden'}`}>
                    {Bemerkung}
                </span>
            </td>
        </tr>
    )
}

export default StrofalleTable