import React, {useEffect} from "react"
import UserManagementCard from "../../../card/userManagementCard";
import Pagination from "../../../components/pagination";
import {useStateValue} from "../../../states/StateProvider";
import {ClipLoader, HashLoader} from "react-spinners";
import {RiArrowDownSFill, RiArrowUpSFill} from "react-icons/ri";
import {UserManagementHeaders} from "../../../staticData/userManagementHeaders";
import {formatDate} from "../../../helper/formatDate";
import {useNavigate} from "react-router";

const UserManagementTable = ({users, pageSize, loading, total, role, filterIDUM, filterUM}) => {

    let PageSize = pageSize;
    const navigate = useNavigate()
    const [{page, sortUserColum, sortUserMethod}, dispatch] = useStateValue();
    const searChableFields = [3]

    useEffect(() => {
        if (role === 'External') {
            navigate('/')
        }
    }, []);

    function ascSort(id) {
        dispatch({type: "SET_SORTUSERCOLUMN", item: id})
        dispatch({type: "SET_SORTUSERMETHOD", item: 'asc'})
    }

    function descSort(id) {
        dispatch({type: "SET_SORTUSERCOLUMN", item: id})
        dispatch({type: "SET_SORTUSERMETHOD", item: 'desc'})
    }

    function enableFilter(id, val) {
        if (id === 1) {
            dispatch({type: "SET_SORTBESTANDFILTERUM", item: {...filterUM, a: val}})
            dispatch({type: "SET_SORTBESTANDFILTERIDUM", item: {...filterIDUM, a: 1}})
        }
        if (id === 2) {
            dispatch({type: "SET_SORTBESTANDFILTERUM", item: {...filterUM, b: val}})
            dispatch({type: "SET_SORTBESTANDFILTERIDUM", item: {...filterIDUM, b: 2}})
        }
        if (id === 3) {
            dispatch({type: "SET_SORTBESTANDFILTERUM", item: {...filterUM, c: val}})
            dispatch({type: "SET_SORTBESTANDFILTERIDUM", item: {...filterIDUM, c: 3}})
        }
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
                                            <span
                                                className={`${!(searChableFields.includes(header.id)) && 'opacity-0'}`}>
                                                <input type='text' placeholder='Suche...'
                                                       className='w-full h-2 px-2 py-3 search'
                                                       value={header.id === 1 ? filterUM.a : header.id === 2 ? filterUM.b : filterUM.c}
                                                       onChange={(e) => enableFilter(header.id, e.target.value)}
                                                />
                                            </span>
                                        </th>
                                    ))
                                }
                            </tr>
                            </thead>
                            {
                                loading ?
                                    <thead>
                                    <tr className='mt-24 mb-24 absolute flex justify-center m-auto'>
                                        <td style={{marginLeft: '45vw'}}><ClipLoader color={'#afafaf'}/></td>
                                    </tr>
                                    </thead>
                                    : (users?.length > 0 && !loading) &&
                                        users?.map((u, index) => (
                                            <UserManagementCard
                                                key={index}
                                                index={index}
                                                name={u.fullname}
                                                userID={u.ID}
                                                users={users}
                                                role={u.role}
                                                isAdmin={u.isUserAdmin}
                                                email={u.email}
                                                status={u.status}
                                                lastLogin={formatDate(u.dateLastLogin, true)}
                                                created={formatDate(u.dateCreate, true)}
                                                prtnrNo={u.partnernr}
                                                valid={u.isActive}
                                            />
                                        ))
                            }
                        </table>
                        {
                            (users?.length === 0 && !loading) &&
                            <div className='centerItemsRelative h-80'>
                                <h2 className='text-2xl text-text text-center font-bold'>
                                    Es wurden keine Daten zu Ihrer Suche gefunden.
                                    <br/>
                                    Bitte prüfen Sie ggf. die Filter-Einstellungen.
                                </h2>
                            </div>
                        }

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