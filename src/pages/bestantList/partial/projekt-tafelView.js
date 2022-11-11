import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import {BsChatLeftText} from "react-icons/bs";
import {formatDate} from "../../../helper/formatDate";

const ProjectTafelView = ({
                              FirmaKurz,
                              Firmenname,
                              MA,
                              Note,
                              printing,
                              ZustandigerFKB,
                              BD,
                              FD,
                              DGAPIKAM,
                              DL_Kzl_vollst,
                              Projtd_vollst,
                              Projtd_abge,
                              AA_FA_hin,
                              StSvGA_erst,
                              ArTfGA_erst,
                              ProjStart,
                              MAV_an_FKB,
                              MAB_fertig,
                              date
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
                <Link to={`/firmenprojekte/${FirmaKurz.allReplace({'/': '%2F', ' ': '_'})}`} target="_blank">
                    {FirmaKurz}
                </Link>
            </td>
            <td className="w-52 text-gray-900 font-light px-3">
                {Firmenname}
            </td>
            <td className="w-16 text-gray-900 font-light px-3">
                {MA}
            </td>
            <td className="w-40 text-gray-900 font-light px-3">
                {ZustandigerFKB}
            </td>
            <td className="text-gray-900 font-light px-3" >
                {BD}
            </td>
            <td className="text-gray-900 font-light px-3" >
                {FD}
            </td>

            <td className="text-gray-900 font-light px-3" >
                {DGAPIKAM}
            </td>
            <td className="px-3 font-light text-gray-900">
                {formatDate(DL_Kzl_vollst, false)}
            </td>
            <td className="px-3 font-light text-gray-900">
                {formatDate(Projtd_vollst, false)}
            </td>
            <td className="px-3 font-light text-gray-900">
                {formatDate(Projtd_abge, false)}
            </td>
            <td className="px-3 font-light text-gray-900">
                {formatDate(AA_FA_hin, false)}
            </td>
            <td className="px-3 font-light text-gray-900">
                {formatDate(StSvGA_erst, false)}
            </td>
            <td className="px-3 font-light text-gray-900">
                {formatDate(ArTfGA_erst, false)}
            </td>
            <td className="px-3 font-light text-gray-900">
                {formatDate(ProjStart, false)}
            </td>
            <td className="px-3 font-light text-gray-900">
                {formatDate(MAV_an_FKB, false)}
            </td>
            <td className="px-3 font-light text-gray-900">
                {formatDate(MAB_fertig, false)}
            </td>
            {/*<td className="px-6 font-light text-gray-900">*/}
            {/*    {date}*/}
            {/*</td>*/}
            <td hidden={printing} className="tooltip text-gray-900 font-light px-3">
                <BsChatLeftText size='16px'/>
                <span className={`${Note ? 'tooltiptext' : 'hidden'}`}>
                    {Note}
                </span>
            </td>
        </tr>
    )
}

export default ProjectTafelView