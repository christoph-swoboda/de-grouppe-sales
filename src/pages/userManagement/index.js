import React, {useEffect, useState} from "react";
import UserManagementTable from "./partial/table";
import BankManagerView from "./partial/bankManagerView";
import Api from "../../Api/api";
import {useStateValue} from "../../states/StateProvider";
import {Navigate, useHistory, useNavigate} from "react-router-dom";

const UserManagement = () => {
    const [search, setSearch] = useState()
    const [users, setUsers] = useState([])
    const role = JSON.parse(localStorage.role)
    const user = JSON.parse(localStorage.getItem('user'))
    const userID = user.ID
    const [rows, setRows] = useState('10');
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [{userValidated, page},dispatch] = useStateValue();
    const navigate=useNavigate()

    useEffect(() => {
        if(role==='External'){
           navigate('/')
        }
        setLoading(true)
        let data = new FormData()
        data.append('userID', userID)
        data.append('rows', rows)
        data.append('page', page)

        Api().post('/getUsers',data).then(res => {
            setUsers(res.data)
            setTotal(Number(res.data[0].totalUsers))
            setLoading(false)
        }).catch(e => {
            setLoading(false)
        })
    }, [rows,userID,userValidated,page]);

    function setPageStates(e){
        dispatch({type: "SET_PAGE", item: 1})
        setRows(e.target.value)
    }


    return (
        <div className='dashboardContainer'>
            <div className='lg:flex justify-between mt-10 sm:block'>
                <h2 className='text-2xl lg:text-left font-extrabold'>{role === 'External' ? 'Banken-Kooperations-Verwaltung' : 'Benutzerverwaltung'}</h2>
                <p className='px-3 py-2 rounded-2xl bg-mainBlue text-sm text-white ml-2'>ADD NEW USER</p>
            </div>

            <div className='bg-white my-4'>
                <div className='rounded-xl p-8 lg:flex sm:block'>
                    <input className='mr-5 search' type='search' placeholder='sueche..'
                           onChange={(e) => setSearch(e.target.value)}
                    />
                    <p className='text-sm text-grey ml-auto mt-2'>
                        {page === 1 ? page : (1 + (Number(rows)*page))-Number(rows)} bis {(users.length < Number(rows)) ? users.length+Number(rows)<total?users.length+(Number(rows)*page)-Number(rows):total : (Number(rows)+(Number(rows)*page))-Number(rows)} von {total} Eintragen
                    </p>
                    <h2 className='text-sm text-grey ml-6 mt-2 ml-10'>
                        Eintrage anzigen: <span>
                        <select onChange={setPageStates} className='bg-transparent text-mainBlue'>
                            <option value={'10'}>{10}</option>
                            <option value={'25'}>{25}</option>
                        </select>
                    </span>
                    </h2>
                </div>
                {
                    role === 'Internal' ?
                        <UserManagementTable role={role} users={users} pageSize={rows} total={total} loading={loading}/>
                        :
                        <BankManagerView role={role} users={users} pageSize={rows} total={total} loading={loading}/>
                }
            </div>
        </div>
    )
}

export default UserManagement