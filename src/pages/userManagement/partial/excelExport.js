import React, {useState} from "react";
import * as excelJS from "exceljs";
import {saveAs} from "file-saver";
import {RiFileExcel2Fill} from "react-icons/ri";
import Api from "../../../Api/api";
import {toast} from "react-toastify";
import {AES, enc} from "crypto-js";
import {useStateValue} from "../../../states/StateProvider";


const ExcelExportUsers = ({title, url, portal}) => {
    const workbook = new excelJS.Workbook();
    workbook.creator = "test";
    workbook.lastModifiedBy = "test";
    workbook.created = new Date();
    workbook.modified = new Date();
    const [{
        secretKey
    }] = useStateValue();
    const decryptedBytes = localStorage.getItem('user') ? AES.decrypt(localStorage.getItem('user'), secretKey) : false;
    const user = JSON.parse(decryptedBytes.toString(enc.Utf8))
    const [loadingAll, setLoadingAll] = useState(false);
    const fileName = 'Benutzer_Auswertung_-' + formatDate(new Date()) + '.xlsx'

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
        await prepareData('Firmenprojekte excel daten', url)
    }

    async function prepareData(Sheet, url) {
        setLoadingAll(true)

        await Api().get(url).then(res => {
            let sheet = workbook.addWorksheet(Sheet);
            sheet.getRow(1).values = Object.keys(res.data[0])
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
            Object.entries(res.data[0]).map(v => {
                keys.push({
                    key: v[0],
                    width: 20
                })
            })
            sheet.columns = keys;
            sheet.addRows(res.data)
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
            className={`${loadingAll ? 'opacity-50' : ''} flex justify-start mx-1 cursor-pointer -mt-20 ml-8`}
            onClick={printXl}
        >
            <RiFileExcel2Fill className='mr-1' size='25px' color={'#388E3C'}/>
            <span className='mr-1 mb-1 text-grey text-sm'>{!loadingAll ? title : 'wird heruntergeladen...'}</span>
        </div>
    )
}

export default ExcelExportUsers