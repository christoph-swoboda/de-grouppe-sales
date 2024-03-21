import React, {useEffect} from "react";
import UserManagementTable from "./table";
import {useNavigate} from "react-router";

const AdminView = ({users, pageSize, loading, total, role, filterIDUM, filterUM}) => {

    const navigate = useNavigate()
    useEffect(() => {
        if (role === 'ExtRUV' || role === 'ExtDGG' || role === 'ManDGG' || role === 'ManRUV') {
            navigate('/')
        }
    }, []);

    return (
        <div>
            <UserManagementTable role={role} loading={loading} users={users} pageSize={pageSize} total={total} filterUM={filterUM} filterIDUM={filterIDUM}/>
        </div>
    )
}

export default AdminView