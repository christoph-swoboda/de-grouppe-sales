import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import {BsChatLeftText} from "react-icons/bs";

const UpsellingTable = ({
                            Firma,
                            Closer,
                            bav,
                            bkv,
                            GehaltsExtras,
                            CLS,
                            HRMT,
                            NBG,
                            bbu,
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
                <Link to={`/reporting/dgg/${FirmaID}`} target="_blank">
                    {Firma}
                </Link>
            </td>
            <td className="w-52 text-gray-900 font-light pr-3">
                {Closer}
            </td>
            <td className="w-16 text-gray-900 font-light pr-3">
                {bav}
            </td>
            <td className="w-40 text-gray-900 font-light pr-3">
                {bkv}
            </td>
            <td className="w-40 text-gray-900 font-light pr-3">
                {GehaltsExtras}
            </td>
                <td className="w-40 text-gray-900 font-light pr-3 ">
                    {CLS}
                </td>

            <td className="w-48 text-gray-900 font-light pr-3 ">
                {HRMT}
            </td>
            <td className="w-32 font-light text-gray-900 pr-3">
                {NBG}
            </td>
            <td className="w-32 font-light text-gray-900 pr-3">
                {bbu}
            </td>
        </tr>
    )
}

export default UpsellingTable