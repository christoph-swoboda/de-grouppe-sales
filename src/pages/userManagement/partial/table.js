import React, {useState, useEffect} from "react"
import {GrCheckbox} from "react-icons/gr"
import {FaToggleOn} from "react-icons/fa"
import {UserManagement} from "../../../dummyData/userManagement";
import UserManagementCard from "../../../card/userManagement";

const UserManagementTable = ({role}) => {

    return (
        <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 inline-block min-w-full  sm:px-6 lg:px-8">
                    <div className="overflow-hidden">
                        <table className="min-w-full">
                            <thead className="border-y border-silver border-x-0">
                            <tr>
                                <th scope="col" className="text-sm font-medium text-grey px-6 py-4 ">
                                    #
                                </th>
                                <th scope="col" className="text-sm font-medium text-grey px-6 py-4 ">
                                    eMail
                                </th>
                                <th scope="col" className="text-sm font-medium text-grey px-6 py-4 ">
                                    partnernummer
                                </th>
                                <th scope="col" className="text-sm text-left font-medium text-grey px-6 py-4">
                                    eMail bestätigt
                                </th>
                                <th scope="col" className="text-sm font-medium text-grey px-6 py-4"/>
                            </tr>
                            </thead>
                            {
                                UserManagement.map(u => (
                                    <UserManagementCard
                                        key={u.id}
                                        email={u.email}
                                        prtnrNo={u.prtnrNo}
                                        valid={u.valid}
                                    />
                                ))
                            }
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserManagementTable