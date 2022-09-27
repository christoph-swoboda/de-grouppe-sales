import React from "react"
import UserManagementCard from "../../../card/userManagementCard";
import Pagination from "../../../components/pagination";
import {useStateValue} from "../../../states/StateProvider";
import {HashLoader, PacmanLoader, ScaleLoader, SyncLoader} from "react-spinners";

const UserManagementTable = ({role, users, pageSize, loading, total}) => {

    let PageSize = pageSize;
    const [{page}, dispatch] = useStateValue();

    return (
        <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 inline-block min-w-full  sm:px-6 lg:px-8">
                    <div className="overflow-hidden">
                        <table className="min-w-full text-left">
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
                                loading?
                                    <thead>
                                    <tr className='mt-24 mb-24 flex justify-center m-auto'>
                                       <td style={{marginLeft:'40vw'}}> <HashLoader/></td>
                                    </tr>
                                    </thead>
                                    :
                                users.map((u,index) => (
                                    <UserManagementCard
                                        key={index}
                                        userID={u.ID}
                                        email={u.email}
                                        prtnrNo={u.partnernr}
                                        valid={u.isValid}
                                    />
                                ))
                            }
                        </table>
                        <div className='centerItemsRelative mt-3 mb-2'>
                            <Pagination
                                className="pagination-bar"
                                currentPage={page}
                                totalCount={total}
                                pageSize={PageSize}
                                onPageChange={pageNo => dispatch({type: "SET_PAGE", item: pageNo})}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserManagementTable