import React, {useState, useEffect} from "react";
import * as excelJS from "exceljs";
import {saveAs} from "file-saver";
import {RiFileExcel2Fill} from "react-icons/ri";
import Api from "../../../Api/api";
import {toast} from "react-toastify";


const ExcelExport = ({data, title, loading, all}) => {
    const workbook = new excelJS.Workbook();
    workbook.creator = "test";
    workbook.lastModifiedBy = "test";
    workbook.created = new Date();
    workbook.modified = new Date();
    const user = JSON.parse(localStorage.getItem('user'))
    const userID = user.ID
    const [loadingAll, setLoadingAll] = useState(false);
    const [usersAll, setUsers] = useState([]);
    const fileName='Firmenprojekte-'+ formatDate(new Date())+'.xlsx';

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
        pattern: 'gray0625',
        fgColor: {argb: 'bcbcbc'},
    };

    row.eachCell((cell, rowNumber) => {
        sheet.getColumn(rowNumber).alignment = {
            vertical: "bottom",
            horizontal: "left"
        };
        sheet.getColumn(rowNumber).font = {size: 14, family: 2};
    });

    useEffect(() => {
        if (!all) {
            sheet.addRows(data);
        }
    }, [data]);

    function padTo2Digits(num) {
        return num.toString().padStart(2, '0');
    }

    function formatDate(date) {
        return (
            [
                date.getFullYear(),
                padTo2Digits(date.getMonth() + 1),
                padTo2Digits(date.getDate()),
            ].join('-') +
            '_' +
            [
                padTo2Digits(date.getHours()),
                padTo2Digits(date.getMinutes()),
            ].join('-')
        );
    }

    async function printXl() {
        if (all) {
            setLoadingAll(true)
            let data = new FormData()
            data.append('userID', userID)
            data.append('rows', '10000')
            data.append('page', '1')
            data.append('sortColumn', '7')
            data.append('sortMethod', 'asc')

            await Api().post('/getBestands', data).then(res => {
                sheet.addRows(res.data.bestands)
                setLoadingAll(false)
            }).catch(e => {
                toast.error('Something went wrong!!')
                setLoadingAll(false)
            }).finally(e => {
                if (!loadingAll) {
                    workbook.xlsx.writeBuffer().then(function (buffer) {
                        const blob = new Blob([buffer], {type: "applicationi/xlsx"});
                        saveAs(blob, fileName);
                    });
                }
            })
        } else {
            if (!loading) {
                workbook.xlsx.writeBuffer().then(function (buffer) {
                    const blob = new Blob([buffer], {type: "applicationi/xlsx"});
                    saveAs(blob, fileName);
                });
            }
        }
    }

    return (
        <div className={`${loading || loadingAll ? 'opacity-50' :''} flex justify-center m-1 cursor-pointer`}
             onClick={printXl}
        >
            <RiFileExcel2Fill className='mr-1' size='25px' color={'#388E3C'}/>
            <span className='mr-1 mb-1 text-grey text-sm'>{!loadingAll ? title : 'wird heruntergeladen...'}</span>
        </div>
    )
}

export default ExcelExport