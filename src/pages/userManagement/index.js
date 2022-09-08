import React, {useState} from "react";
import UserManagementTable from "./partial/table";
import BankManagerView from "./partial/bankManagerView";

const UserManagement = () => {
    const [search, setSearch] = useState()
    const role = JSON.parse(localStorage.role)

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
                    <p className='text-sm text-grey ml-auto mt-2'>1 bis 10 von 596 Eintragen</p>
                    <h2 className='text-sm text-grey ml-6 mt-2 ml-10'>
                        Eintrage anzigen: <span>
                        <select className='bg-transparent text-mainBlue'>
                            <option value={50}>50</option>
                            <option value={100}>100</option>
                        </select>
                    </span>
                    </h2>
                </div>
                {
                    role === 'Internal' ?
                        <UserManagementTable role={role}/>
                        :
                        <BankManagerView role={role}/>

                }
            </div>
        </div>
    )
}

export default UserManagement