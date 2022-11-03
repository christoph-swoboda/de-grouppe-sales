import React from "react";
import {HashLoader} from "react-spinners";
import ExternalUsersCard from "../../../card/bankManagerCard";
import BankManagerCard from "../../../card/bankManagerCard";

const BankManagerView = ({role, users, pageSize, loading, total}) => {
    return (
        <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 inline-block min-w-full  sm:px-6 lg:px-8">
                    <div className="overflow-hidden">
                        <table className="min-w-full text-left">
                            <thead className="border-y border-silver border-x-0">
                            <tr>
                                <th scope="col" className="text-sm font-medium text-grey px-6 py-4 ">
                                    FP-Art
                                </th>
                                <th scope="col" className="text-sm font-medium text-grey px-6 py-4 ">
                                    partnernummer
                                </th>
                                <th scope="col" className="text-sm font-medium text-grey px-6 py-4">
                                    Fullname & Name
                                </th>
                                <th scope="col" className="text-sm  font-medium text-grey px-6 py-4">
                                    xv-Nr
                                </th>
                                <th scope="col" className="text-sm font-medium text-grey px-6 py-4"/>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                loading ?
                                    <thead>
                                    <tr className='mt-24 mb-24 flex justify-center m-auto'>
                                        <td style={{marginLeft: '40vw'}}><HashLoader/></td>
                                    </tr>
                                    </thead>
                                    :
                                    users.map((u, index) => (
                                        <BankManagerCard
                                            key={index}
                                            index={index}
                                            name={u.fullname}
                                            userID={u.ID}
                                            email={u.email}
                                            prtnrNo={u.partnernr}
                                            valid={u.isActive}
                                        />
                                    ))
                            }

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BankManagerView