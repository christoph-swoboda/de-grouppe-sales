import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import {BsChatLeftText} from "react-icons/bs";
import {formatDate} from "../../../helper/formatDate";

const BeratungView = ({
                          FirmaKurz,
                          FirmaID,
                          Firmenname,
                          MA,
                          Note,
                          printing,
                          ZustandigerFKB,
                          BD,
                          FD,
                          DGAPIKAM,
                          FP_Freischaltung,
                          FP_Briefing_erfolgt,
                          FP_Start_fix,
                          FP_Abschluss_Umsetzung
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
            <td className="w-40 text-sm text-mainBlue underline font-light px-6">
                {/*add firmaID here*/}
                <Link to={`/firmenprojekte/${FirmaID}`} target="_blank">
                    {FirmaKurz}
                </Link>
            </td>
            <td className="w-52 text-gray-900 font-light pr-3" title={Firmenname}>
                <span >{Firmenname?.length > 30 ? `${Firmenname?.substring(0, 30)}...` : Firmenname}</span>
            </td>
            <td className="w-16 text-gray-900 font-light pr-3">
                {MA}
            </td>
            <td className="w-40 text-gray-900 font-light pr-3">
                {ZustandigerFKB}
            </td>
            <td className="text-gray-900 font-light pr-3">
                {BD}
            </td>
            <td className="text-gray-900 font-light pr-3">
                {FD}
            </td>

            <td className="text-gray-900 font-light pr-3">
                {DGAPIKAM}
            </td>
            <td className="pr-3 font-light text-gray-900">
                {formatDate(FP_Freischaltung, false)}
            </td>
            <td className="pr-3 font-light text-gray-900">
                {formatDate(FP_Briefing_erfolgt, false)}
            </td>
            <td className="pr-3 font-light text-gray-900">
                {formatDate(FP_Start_fix, false)}
            </td>
            <td className="pr-3 font-light text-gray-900">
                {formatDate(FP_Abschluss_Umsetzung, false)}
            </td>
            {/*<td className="px-6 font-light text-gray-900">*/}
            {/*    {date}*/}
            {/*</td>*/}
            <td hidden={printing} className="tooltip text-gray-900 font-light pr-3">
                <BsChatLeftText size='16px'/>
                <span className={`${Note ? 'tooltiptext' : 'hidden'}`}>
                    {Note}
                </span>
            </td>
        </tr>
    )
}

export default BeratungView