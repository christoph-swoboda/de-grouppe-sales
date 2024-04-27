import React, {useEffect, useRef, useState} from "react";
import BankManagerView from "./partial/bankManagerView";
import Api from "../../Api/api";
import {useStateValue} from "../../states/StateProvider";
import {useNavigate} from "react-router";
import Modal from "../../hooks/modal";
import useModal from "../../hooks/useModal";
import AddUsers from "../../components/modal/addUsers";
import {toast} from "react-toastify";
import {BeatLoader} from "react-spinners";
import {GrUserAdmin} from "react-icons/gr";
import {MdSupervisorAccount} from "react-icons/md";
import {FaUser, FaUserSecret} from "react-icons/fa";
import {AES, enc} from "crypto-js";
import AdminView from "./partial/adminView";

const UserManagement = () => {
    const [search, setSearch] = useState('')
    const [searchKey, setSearchKey] = useState('')
    const [users, setUsers] = useState([])
    const [roleFilter, setRoleFilter] = useState({i: true, er: true, ed: true, mr: true, md: true, c: true})
    const [searchResults, setSearchResults] = useState([])
    const [{
        secretKey, userValidated,
        page,
        addUsersModal,
        sortUserColum,
        sortUserMethod,
        filterIDUM, filterUM,
        addUsersDone
    }, dispatch] = useStateValue();
    const decryptedBytes = localStorage.getItem('user') ? AES.decrypt(localStorage.getItem('user'), secretKey) : false;
    const user = JSON.parse(decryptedBytes.toString(enc.Utf8))
    const admin = user.isUserAdmin
    const userID = user.ID
    const role = user.role
    const [rows, setRows] = useState('10');
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [loadingKeys, setLoadingKeys] = useState(false);
    const [modal, setModal] = useState(false)
    const navigate = useNavigate()
    const {toggleAddUsersModal} = useModal();
    const modalRef = useRef()

    useEffect(() => {
        const delayQuery = setTimeout(async () => {
            getUsers(searchKey)
        }, Object.values(filterUM).filter(k => k !== null).length > 0 ? 2000 : 0)

        return () => clearTimeout(delayQuery)

    }, [rows, userID, userValidated, page, sortUserMethod, sortUserColum, addUsersDone, searchKey, filterUM, roleFilter]);

    useEffect(() => {
        const delayQuery = setTimeout(async () => {
            if (search.match(/^ *$/) === null) {
                let data = new FormData()
                data.append('userID', userID)
                data.append('search', search)

                setLoadingKeys(true)
                Api().post('/searchByMail', data).then(res => {
                    setSearchResults(res.data)
                    setLoadingKeys(false)
                    dispatch({type: "SET_PAGE", item: 1})
                }).catch((error) => {
                    setLoadingKeys(false)
                    toast.error('HOPPLA! etwas ist schief gelaufen')
                })
            }
        }, search ? 1500 : 0)

        return () => clearTimeout(delayQuery)
    }, [search])

    useEffect(() => {
        if (searchResults.length > 0) {
            setModal(true)
        }
    }, [searchResults]);

    useEffect(() => {
        document.addEventListener('mousedown', (e) => {
            if (!modalRef.current.contains(e.target)) {
                setModal(false)
            }
        })
    }, []);

    useEffect(() => {
        if (!search) {
            setSearchKey('')
            setModal(false)
            setSearchResults([])
        }
    }, [search]);

    useEffect(() => {
        setSearch('')
    }, [userValidated]);

    function getUsers(src) {
        if (role === 'ExtDGG' || role === 'ExtRUV') {
            navigate('/')
        }
        setLoading(true)
        let data = new FormData()
        data.append('userID', userID)
        data.append('rows', rows)
        data.append('page', page)
        data.append('search', src)
        data.append('sortColumn', sortUserColum)
        data.append('sortMethod', sortUserMethod)
        data.append('vp', filterUM.c)
        data.append('I', roleFilter.i ? '1' : '0')
        data.append('C', roleFilter.c ? '1' : '0')
        data.append('ER', roleFilter.er ? '1' : '0')
        data.append('MR', roleFilter.mr ? '1' : '0')
        data.append('ED', roleFilter.ed ? '1' : '0')
        data.append('MD', roleFilter.md ? '1' : '0')

        Api().post('/getUsers', data).then(res => {

            setUsers(res.data)
            if (res.data.length > 0) {
                setTotal(Number(res.data[0].totalUsers))
            } else {
                setTotal(0)
            }
            setLoading(false)

        }).catch(e => {
            setLoading(false)
            toast.error('etwas ist schief gelaufen!')
        })
    }

    function setUpModal(e) {
        setSearchKey(e.target.value)
        setSearch(e.target.value)
        setModal(false)
    }

    function searchSubmit(e) {
        e.preventDefault();
        getUsers(search)
        setModal(false)
    }

    function setPageStates(e) {
        dispatch({type: "SET_PAGE", item: 1})
        setRows(e.target.value)
    }

    return (
        <div className='dashboardContainer'>
            <div className='lg:flex justify-between pt-2 sm:block'>
                <h2 className='text-2xl lg:text-left'>{admin === '0' ? 'Benutzerübersicht' : 'Benutzerverwaltung'}</h2>
                <div className={admin === '0' || user.role === 'Controlling' ? 'hidden' : ''}>
                    <p className={`px-3 py-2 shadow shadow-md shadow-mainBlue rounded-2xl hover:bg-white hover:text-mainBlue bg-mainBlue text-sm text-white ml-2 cursor-pointer`}
                       onClick={toggleAddUsersModal}>
                        Neuen Benutzer anlegen
                    </p>
                </div>
            </div>

            <div className={`bg-white my-4`}>
                <div className={`rounded-xl p-8 lg:flex sm:block`}>
                    <form onSubmit={searchSubmit} className=' xl:w-3/12 sm:w-full'>
                        <input type="text" className='mr-5 w-full'
                               value={search}
                               placeholder='Suche..'
                               onChange={(e) => setSearch(e.target.value)}
                        />
                        <input type="submit" value="Submit" hidden/>
                    </form>
                    <div className='flex justify-center sm:mb-6 lg:ml-40 lg:-mt-2 mt-2 text-grey'>
                        <div>
                            <div
                                className={`flex w-32 justify-start cursor-pointer my-2  mr-2 pl-1 ${roleFilter.i ? 'border border-offWhite' : 'opacity-50'}`}
                                onClick={() => user.isUserAdmin === '1' && setRoleFilter({
                                    ...roleFilter,
                                    i: !roleFilter.i
                                })}>
                                <GrUserAdmin size={'17px'} color={'#565c8c'}/> <span
                                className='ml-1 mr-6 text-sm'>Innendienst</span>
                            </div>
                            <div
                                className={`flex w-32 justify-start cursor-pointer my-2  mr-2 pl-1 ${roleFilter.er ? 'border border-offWhite' : 'opacity-50'}`}
                                onClick={() => user.isUserAdmin === '1' && setRoleFilter({
                                    ...roleFilter,
                                    er: !roleFilter.er
                                })}>
                                <MdSupervisorAccount size={'17px'} color={'#3A46A9'}/><span
                                className='ml-1 mr-6 text-sm'>FKB </span>
                            </div>
                            <div
                                className={`flex w-32 justify-start cursor-pointer mt-2  mr-2 pl-1 ${roleFilter.ed ? 'border border-offWhite' : 'opacity-50'}`}
                                onClick={() => user.isUserAdmin === '1' && setRoleFilter({
                                    ...roleFilter,
                                    ed: !roleFilter.ed
                                })}>
                                <MdSupervisorAccount size={'17px'} color={'#0a523f'}/><span
                                className='ml-1 mr-6 text-sm'>VP </span>
                            </div>
                        </div>
                        <div>
                            <div
                                className={`flex w-32 justify-start cursor-pointer my-2 mr-2 pl-1 ${roleFilter.c ? 'border border-offWhite' : 'opacity-50'}`}
                                onClick={() => user.isUserAdmin === '1' && setRoleFilter({
                                    ...roleFilter,
                                    c: !roleFilter.c
                                })}>
                                <FaUserSecret size={'17px'} color={'#565c8c'}/> <span
                                className='ml-1 mr-6 text-sm'>Controlling</span>
                            </div>
                            <div
                                className={`flex w-32 justify-start cursor-pointer my-2  pl-1 ${roleFilter.mr ? 'border border-offWhite' : 'opacity-50'}`}
                                onClick={() => user.isUserAdmin === '1' && setRoleFilter({
                                    ...roleFilter,
                                    mr: !roleFilter.mr
                                })}>
                                <FaUser size={'17px'} color={'#565c8c'}/> <span
                                className='ml-1 mr-6 text-sm'>Management</span>
                            </div>
                            <div
                                className={`flex w-32 justify-start cursor-pointer mt-2  pl-1 ${roleFilter.md ? 'border border-offWhite' : 'opacity-50'}`}
                                onClick={() => user.isUserAdmin === '1' && setRoleFilter({
                                    ...roleFilter,
                                    md: !roleFilter.md
                                })}>
                                <FaUser size={'17px'} color={'#0a523f'}/> <span
                                className='ml-1 mr-6 text-sm'>Struktur</span>
                            </div>
                        </div>
                    </div>
                    <p className='text-sm text-grey ml-auto mt-2'>
                        {page === 1 ? page : (1 + (Number(rows) * page)) - Number(rows)} bis {(users.length < Number(rows)) ? users.length + Number(rows) < total ? users.length + (Number(rows) * page) - Number(rows) : total : (Number(rows) + (Number(rows) * page)) - Number(rows)} von {total} Einträge
                    </p>
                    <h2 className='text-sm text-grey mt-2 ml-10'>
                        Einträge anzeigen:
                        <span>
                            <select onChange={setPageStates} className='bg-transparent text-mainBlue'>
                                <option value={'10'}>{10}</option>
                                <option value={'25'}>{25}</option>
                                <option value={'10000'}>Alle</option>
                            </select>
                        </span>
                    </h2>
                </div>
                <div className='text-left absolute ml-9 -mt-9'>
                    {loadingKeys && <BeatLoader size='8'/>}
                </div>
                <div ref={modalRef}
                     className={`${!modal && 'hidden'} absolute w-72 max-h-80 ml-9 bg-offWhite p-5 z-10 -mt-6 overflow-y-scroll`}>
                    {
                        searchResults?.map((res, i) => (
                            <input type='button' key={i} onClick={setUpModal}
                                   className='cursor-pointer flex flex-col text-mainBlue text-sm text-left border-none underline hover:text-red p-2'
                                   value={res.email}
                            />
                        ))
                    }

                </div>
                <div>
                    {
                        (role === 'Internal' || role === 'Controller') ?
                            <AdminView role={role} users={users} pageSize={rows} total={total} loading={loading}
                                       filterUM={filterUM} filterIDUM={filterIDUM}/>
                            : (role === 'ManDGG' || role === 'ManRUV') &&
                            <BankManagerView role={role} users={users} pageSize={rows} total={total} loading={loading}
                                             filterUM={filterUM} filterIDUM={filterIDUM}/>
                    }
                </div>
            </div>

            <Modal toggle={toggleAddUsersModal}
                   visible={addUsersModal}
                   component={<AddUsers/>}
            />
        </div>
    )
}

export default UserManagement