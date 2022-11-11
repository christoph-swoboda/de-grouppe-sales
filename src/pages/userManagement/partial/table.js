import React, {useState} from "react"
import UserManagementCard from "../../../card/userManagementCard";
import Pagination from "../../../components/pagination";
import {useStateValue} from "../../../states/StateProvider";
import {HashLoader} from "react-spinners";
import {RiArrowDownSFill, RiArrowUpSFill} from "react-icons/ri";
import {UserManagementHeaders} from "../../../dummyData/userManagementHeaders";
import {formatDate} from "../../../helper/formatDate";

const UserManagementTable = ({users, pageSize, loading, total}) => {

    let PageSize = pageSize;
    const [{page, sortUserColum, sortUserMethod}, dispatch] = useStateValue();

    function ascSort(id) {
        dispatch({type: "SET_SORTUSERCOLUMN", item: id})
        dispatch({type: "SET_SORTUSERMETHOD", item: 'asc'})
    }

    function descSort(id) {
        dispatch({type: "SET_SORTUSERCOLUMN", item: id})
        dispatch({type: "SET_SORTUSERMETHOD", item: 'desc'})
    }

    return (
        <div className="flex flex-col ml-3">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="overflow-hidden">
                        <table className="min-w-full text-left">
                            <thead className="border-y border-silver border-x-0">
                            <tr>
                                {
                                    !loading &&
                                    UserManagementHeaders.map(header => (
                                        <th key={header.id} scope="col"
                                            className="text-sm font-medium text-grey px-6 py-2"
                                        >
                                                    <span className='flex justify-left'>
                                                          <span
                                                              className={`tooltip mt-1.5 text-center xl:h-fit lg:h-14 ${sortUserColum === header.id && 'text-mainBlue'}`}
                                                          >
                                                            {header.title}
                                                          </span>
                                                        <span>
                                                            <p className={`cursor-pointer ${sortUserColum === header.id && sortUserMethod === 'asc' ? 'text-mainBlue' : ''}`}
                                                               onClick={() => ascSort(header.id)}
                                                            >
                                                                <RiArrowUpSFill size='22px'/>
                                                            </p>
                                                            <p className={`-mt-3.5 cursor-pointer ${sortUserColum === header.id && sortUserMethod === 'desc' ? 'text-mainBlue' : ''}`}
                                                               onClick={() => descSort(header.id)}
                                                            >
                                                                <RiArrowDownSFill size='22px'/>
                                                            </p>
                                                        </span>
                                                    </span>
                                            {/*<span className={`${(header.title === 'MA' || header.title === 'Daten') && 'opacity-0'}`}>*/}
                                            {/*            <input className='w-full h-2 px-2 py-3 search mb-4' type='text'*/}
                                            {/*                   placeholder='Suche...'*/}
                                            {/*            />*/}
                                            {/*</span>*/}
                                        </th>
                                    ))
                                }
                                <th scope="col" className="text-sm w-2/12 font-medium text-grey px-6 py-2"/>
                            </tr>
                            </thead>
                            {
                                loading ?
                                    <thead>
                                    <tr className='mt-24 mb-24 flex justify-center m-auto'>
                                        <td style={{marginLeft: '40vw'}}><HashLoader/></td>
                                    </tr>
                                    </thead>
                                    :
                                    users?.map((u, index) => (
                                        <UserManagementCard
                                            key={index}
                                            index={index}
                                            name={u.fullname}
                                            userID={u.ID}
                                            email={u.email}
                                            lastLogin={formatDate(u.dateLastLogin, true)}
                                            created={formatDate(u.dateCreate, true)}
                                            prtnrNo={u.partnernr}
                                            valid={u.isActive}
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