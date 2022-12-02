import React, {useState} from "react";
import * as excelJS from "exceljs";
import {saveAs} from "file-saver";
import {RiFileExcel2Fill} from "react-icons/ri";
import Api from "../../../Api/api";
import {toast} from "react-toastify";


const ExcelExport = ({Gesamt, title, loading, all, len}) => {
    const workbook = new excelJS.Workbook();
    workbook.creator = "test";
    workbook.lastModifiedBy = "test";
    workbook.created = new Date();
    workbook.modified = new Date();
    const user = JSON.parse(localStorage.getItem('user'))
    const userID = user.ID
    const [loadingAll, setLoadingAll] = useState(false);
    const fileName = Gesamt ? 'Firmenprojekte-Gesamt-' + formatDate(new Date()) + '.xlsx' : 'Firmenprojekte-' + formatDate(new Date()) + '.xlsx'

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
        let data = new FormData()
        data.append('userID', userID)
        data.append('rows', '10000')
        data.append('page', '1')
        data.append('sortColumn', '7')
        data.append('sortMethod', 'asc')

        let Data = new FormData()
        Data.append('userID', userID)

        if (all) {
            await prepareData('Firmenprojekte excel daten', '/getBestands', data)
        } else {
            await prepareData('Firmenprojekte Gesamt daten', '/allExcel', Data)
        }
    }

    async function prepareData(Sheet, url, Data) {
        setLoadingAll(true)

        await Api().post(url, Data).then(res => {
            let sheet = workbook.addWorksheet(Sheet);
            if (all) {
                let arr = []
                Object.keys(res.data.bestands[0]).map(k => {
                    if (k !== 'MA') {
                        arr.push(k)
                    }
                })
                sheet.getRow(1).values = Object.values(arr).slice(0, 7)
            } else {
                sheet.getRow(1).values = Object.keys(res.data.bestands[0])
            }
            const row = sheet.getRow(1);
            row.eachCell((cell, rowNumber) => {
                sheet.getColumn(rowNumber).alignment = {
                    vertical: "bottom",
                    horizontal: "left"
                };
                sheet.getColumn(rowNumber).font = {size: 10, family: 2};
                sheet.getRow(1).font = {
                    name: 'Arial Black',
                    color: {argb: '3E4052FF'},
                    family: 1,
                    size: 10,
                    bold: true
                };
            });

            let keys = []
            Object.entries(res.data.bestands[0]).map(v => {
                keys.push({
                    key: v[0],
                    width: all && 30
                })
            })

            if (all) {
                let arr = []
                keys.map(k => {
                    if (k.key !== 'MA') {
                        arr.push(k)
                    }
                })
                sheet.columns = arr.slice(0, 7);
            } else {
                sheet.columns = keys;
            }
            sheet.addRows(res.data.bestands)
            setLoadingAll(false)
        }).catch(e => {
            toast.error('Something went wrong!!')
            setLoadingAll(false)
        })
            .finally(e => {
                if (!loadingAll) {
                    workbook.xlsx.writeBuffer().then(function (buffer) {
                        const blob = new Blob([buffer], {type: "applicationi/xlsx"});
                        saveAs(blob, fileName);
                    });
                }
            })
    }

    return (
        <div
            className={`${loading || loadingAll ? 'opacity-50' : ''} flex justify-center m-1 cursor-pointer ${(len === 0) && 'hideDiv'} `}
            onClick={printXl}
        >
            <RiFileExcel2Fill className='mr-1' size='25px' color={'#388E3C'}/>
            <span className='mr-1 mb-1 text-grey text-sm'>{!loadingAll ? title : 'wird heruntergeladen...'}</span>
        </div>
    )
}

export default ExcelExport