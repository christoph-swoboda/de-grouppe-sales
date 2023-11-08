import React, {useEffect, useState} from "react"
import '../../styles/dashboard.scss'
import {Graph} from "./partial/graph";
import Api from "../../Api/api";
import Boxes from "./partial/boxes";
import {MdDone} from "react-icons/md";
import {SiVirustotal} from "react-icons/si";
import {AES, enc} from "crypto-js";
import {useStateValue} from "../../states/StateProvider";
import {AiOutlineClose} from "react-icons/ai";

const Dashboard = () => {
    const [user, setUser] = useState([])
    const [total, setTotal] = useState([])
    const [done, setDone] = useState([])
    const [toggle, setToggle] = useState(false)
    const [canceled, setCanceled] = useState([])
    const [{secretKey}, dispatch] = useStateValue();

    // Function to update the state
    const updateMainState = (newValue) => {
        setToggle((prevState) => !prevState);
    };

    useEffect(() => {
        try {
            const decryptedBytes = localStorage.getItem('user')?AES.decrypt(localStorage.getItem('user'), secretKey):false;
            const User = JSON.parse(decryptedBytes.toString(enc.Utf8))
            setUser(User)
            Api().get(`/getDashboardCounts/${User.ID}`).then(res => {
                setTotal(res.data.slice(0,2))
                setDone(res.data.slice(2,4))
                setCanceled(res.data.slice(4,6))
            })
        } catch (e) {
            window.location.replace('/anmeldung')
        }
    }, []);

    return (
        <div className='dashboardContainer'>
            <div className='bg-white rounded-xl text-left p-8'>
                <div
                    className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-3 items-center content-center mb-10'>
                    <Boxes rotate={toggle} toggleState ={updateMainState} col={'#2f2f2f'} data={total} icon={<SiVirustotal color={'#ffffff'} size='27px'/>} title={'Alle Projekte'}/>
                    {
                        toggle.toString()==='false' ?
                            <Boxes rotate={toggle} toggleState ={updateMainState} col={'#2f2f2f'} data={done} icon={<MdDone color={'#ffffff'} size='30px'/>} title={'Abgeschlossen'}/>
                            :
                            <Boxes rotate={toggle} toggleState ={updateMainState} col={'#2f2f2f'} data={canceled} icon={<AiOutlineClose  color={'#ffffff'} size='30px'/>} title={'Abgesagt'}/>
                    }
                    <div className="flex flex-col rounded-md shadow-lg px-6">
                        {/*<div className="overflow-x-auto sm:-mx-6 lg:-mx-8">*/}
                        {/*    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">*/}
                        {/*        <div className="h-36 overflow-auto">*/}
                        {/*            <table className="min-w-full text-left text-sm font-light">*/}
                        {/*                <thead className="border-b font-medium border-whiteDark">*/}
                        {/*                <tr>*/}
                        {/*                    /!*<th scope="col" className="px-6 py-4">#</th>*!/*/}
                        {/*                    <th scope="col" className="px-6 py-4">Firma</th>*/}
                        {/*                    <th scope="col" className="px-6 py-4">Note</th>*/}
                        {/*                </tr>*/}
                        {/*                </thead>*/}
                        {/*                <tbody>*/}
                        {/*                <tr className="border-b border-whiteDark">*/}
                        {/*                    /!*<td className="whitespace-nowrap px-6 py-4 font-medium">1</td>*!/*/}
                        {/*                    <td className="whitespace-nowrap px-6 py-4">Mark</td>*/}
                        {/*                    <td className="whitespace-nowrap px-6 py-4">Otto</td>*/}
                        {/*                </tr>*/}
                        {/*                <tr className="border-b border-whiteDark">*/}
                        {/*                    /!*<td className="whitespace-nowrap px-6 py-4 font-medium">2</td>*!/*/}
                        {/*                    <td className="whitespace-nowrap px-6 py-4">Jacob</td>*/}
                        {/*                    <td className="whitespace-nowrap px-6 py-4">Thornton</td>*/}
                        {/*                </tr>*/}
                        {/*                <tr className="border-b border-whiteDark">*/}
                        {/*                    /!*<td className="whitespace-nowrap px-6 py-4 font-medium">3</td>*!/*/}
                        {/*                    <td className="whitespace-nowrap px-6 py-4">Larry</td>*/}
                        {/*                    <td className="whitespace-nowrap px-6 py-4">Wild</td>*/}
                        {/*                </tr>*/}
                        {/*                </tbody>*/}
                        {/*            </table>*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                    </div>
                </div>
                <Graph User={user} IST header={'IST-Potenzial im jeweiligen Schritt'}/>
            </div>
        </div>
    )
}

export default Dashboard