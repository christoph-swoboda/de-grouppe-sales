import React from "react";
import {HashLoader} from "react-spinners";
import ExternalUsersCard from "../../../card/bankManagerCard";
import BankManagerCard from "../../../card/bankManagerCard";
import UserManagementCard from "../../../card/userManagementCard";
import UserManagementTable from "./table";

const BankManagerView = ({users, pageSize, loading, total}) => {
    return (
        <div>
           <UserManagementTable loading={loading} users={users} pageSize={pageSize} total={total}/>
        </div>
    )
}

export default BankManagerView