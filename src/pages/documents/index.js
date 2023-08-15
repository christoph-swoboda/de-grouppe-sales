import React, {useState, useEffect} from "react";

const Documents = () => {
    return (
        <div className='py-10 px-4 min-h-screen'>
            <h2 className='mt-16 text-2xl text-left font-light'>Dokumente List</h2>
            <div className='bg-offWhite rounded-md my-5'>
                <table className='min-w-full text-left bg-white'>
                    <thead className="whitespace-nowrap border-y border-silver border-x-0">
                        <tr>
                            <th className="text-sm text-grey pl-1.5" scope="col">Dateinachweise</th>
                            <th className="text-sm text-grey pl-1.5" scope="col"></th>
                            <th className="text-sm text-grey pl-1.5" scope="col"></th>
                            <th className="text-sm text-grey pl-1.5" scope="col"></th>
                            <th className="text-sm text-grey pl-1.5" scope="col">Date</th>
                            <th className="text-sm text-grey pl-1.5" scope="col">Username</th>
                        </tr>
                    </thead>
                </table>
            </div>
        </div>
    )
}

export default Documents