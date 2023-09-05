import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import {BsChatLeftText} from "react-icons/bs";
import {formatDate} from "../../../helper/formatDate";

const VertriebView = ({
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
                          Ersttermin,
                          Analyseb_vollst,
                          SK_Termin,
                          iForm_DGAPI_AM,
                          Auftrag_DL_Paket,
                          ArTfGA_erst,
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
            <td className="w-52 text-gray-900 font-light pr-3">
                {Firmenname}
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
                {formatDate(Ersttermin, false)}
            </td>
            <td className="pr-3 font-light text-gray-900">
                {formatDate(Analyseb_vollst, false)}
            </td>
            <td className="pr-3 font-light text-gray-900">
                {formatDate(SK_Termin, false)}
            </td>
            <td className="pr-3 font-light text-gray-900">
                {formatDate(iForm_DGAPI_AM, false)}
            </td>
            <td className="pr-3 font-light text-gray-900">
                {formatDate(ArTfGA_erst, false)}
            </td>
            <td className="pr-3 font-light text-gray-900">
                {formatDate(Auftrag_DL_Paket, false)}
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

export default VertriebView