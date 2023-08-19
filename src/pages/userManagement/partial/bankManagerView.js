import React, {useEffect} from "react";
import UserManagementTable from "./table";
import {useNavigate} from "react-router";

const BankManagerView = ({users, pageSize, loading, total, role}) => {

    const navigate=useNavigate()
    useEffect(() => {
        if(role!=='Supervisor'){
            navigate('/')
        }
    }, []);

    return (
        <div>
            <UserManagementTable role={role} loading={loading} users={users} pageSize={pageSize} total={total}/>
        </div>
    )
}

export default BankManagerView