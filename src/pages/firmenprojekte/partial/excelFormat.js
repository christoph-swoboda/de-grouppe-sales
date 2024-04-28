import React, {useState} from "react";
import * as excelJS from "exceljs";
import {saveAs} from "file-saver";
import {RiFileExcel2Fill} from "react-icons/ri";
import Api from "../../../Api/api";
import {toast} from "react-toastify";
import {AES, enc} from "crypto-js";
import {useStateValue} from "../../../states/StateProvider";


const ExcelExport = ({Gesamt, title, loading, all, len, rows, url, count, portal}) => {
    const workbook = new excelJS.Workbook();
    workbook.creator = "test";
    workbook.lastModifiedBy = "test";
    workbook.created = new Date();
    workbook.modified = new Date();
    const [{
        pageBestand,
        sortColumn,
        sortMethod,
        filterID,
        filter,
        dateFilter,
        secretKey
    }, dispatch] = useStateValue();
    const decryptedBytes = localStorage.getItem('user') ? AES.decrypt(localStorage.getItem('user'), secretKey) : false;
    const user = JSON.parse(decryptedBytes.toString(enc.Utf8))
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
        data.append('rows', rows)
        data.append('page', pageBestand)
        data.append('sortColumn', sortColumn)
        data.append('portal', portal)
        data.append('sortMethod', sortMethod)
        data.append('filterID', JSON.stringify(filterID))
        data.append('filter', JSON.stringify(filter))
        data.append('dateFilter', JSON.stringify(dateFilter))

        let Data = new FormData()
        Data.append('userID', userID)
        Data.append('portal', portal)

        if (all) {
            await prepareData('Firmenprojekte excel daten', url, data)
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
                    if (k !== 'Note' && k !== 'FP_ID' && k !== 'totalCustomers') {
                        arr.push(k)
                    }
                })
                sheet.getRow(1).values = Object.values(arr).slice(0, count)
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
                    width: all && 25
                })
            })

            if (all) {
                let arr = []
                keys.map(k => {
                    if (k.key !== 'Note' && k.key !== 'FP_ID' && k.key !== 'totalCustomers') {
                        arr.push(k)
                    }
                })
                sheet.columns = arr.slice(0, count);
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
            className={`${loading || loadingAll ? 'opacity-50' : ''} flex justify-center m-1 cursor-pointer ${(!loading && len === 0 && title !== 'Excel Export Gesamt') && 'hideDiv'} `}
            onClick={printXl}
        >
            <RiFileExcel2Fill className='mr-1' size='25px' color={'#388E3C'}/>
            <span className='mr-1 mb-1 text-grey text-sm'>{!loadingAll ? title : 'wird heruntergeladen...'}</span>
        </div>
    )
}

export default ExcelExport