import React, {useState, useEffect} from "react";
import * as excelJS from "exceljs";
import {saveAs} from "file-saver";
import {RiFileExcel2Fill} from "react-icons/ri";


const ExcelExport = ({data, title, loading}) => {
    const workbook = new excelJS.Workbook();
    workbook.creator = "test";
    workbook.lastModifiedBy = "test";
    workbook.created = new Date();
    workbook.modified = new Date();

    let sheet = workbook.addWorksheet("Firmenprojeckte excel daten");

    sheet.getRow(1).values = [
        "Firma Kurz",
        "Zust. Berater",
        "Bank",
        "Region",
        "Kd-Bnerater Bank",
        "MA",
        "P-Status",
        "Date",
        // "Note",
    ];
    sheet.getRow(2).values = [
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        // "Note",
    ];
    sheet.columns = [
        {key: "FirmaKurz", width: 40},
        {key: "ZustBerater", width: 40},
        {key: "Bank", width: 40},
        {key: "RegioBereich", width: 22},
        {key: "FBKBank", width: 30},
        {key: "MA", width: 10},
        {key: "PStatus", width: 50},
        {key: "Date", width: 30},
        // { key: "Note", width: 330 },
    ];

    const row = sheet.getRow(1);

    row.fill = {
        type: 'pattern',
        pattern:'gray0625',
        fgColor:{argb:'bcbcbc'},
    };

    row.eachCell((cell, rowNumber) => {
        sheet.getColumn(rowNumber).alignment = {
            vertical: "bottom",
            horizontal: "left"
        };
        sheet.getColumn(rowNumber).font = {size: 14, family: 2};
    });

    function printXl() {
        if (!loading) {
            workbook.xlsx.writeBuffer().then(function (buffer) {
                const blob = new Blob([buffer], {type: "applicationi/xlsx"});
                saveAs(blob, "Firmenprojeckte.xlsx");
            });
        }
    }

    useEffect(() => {
        sheet.addRows(data);
    }, [data]);


    return (
        <div className={`${loading ?'opacity-50':''} flex justify-center m-1 cursor-pointer`} onClick={printXl}>
            <RiFileExcel2Fill className='mr-1' size='25px' color={'#388E3C'}/>
            <span className='mr-1 mb-1 text-grey text-sm'>{title}</span>
        </div>
    )
}

export default ExcelExport