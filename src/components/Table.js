import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { tableActions } from '../store/tableSlice';

const Table = () => {
    const data = useSelector((state) => state.table);
    const dispatch = useDispatch();

    return (
        <div className='mx-[100px] mt-14 pb-[100px]'>
            <table className=''>
                <thead className='text-[10px] text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                    <tr>
                    {data.tableData.length > 0 && 
                        Object.keys(data.tableData[0]).map((header) => (
                        <th key={header}>{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.filteredRows.map((row, index) => (
                    <tr key={index} className='bg-gray-800 border-gray-700'>
                        {Object.values(row).map((cell, index) => (
                        <td key={index} className='px-4 py-2 text-[10px] font-medium whitespace-nowrap text-white'>{cell}</td>
                        ))}
                    </tr>
                    ))}
                </tbody>
            </table>    
        </div>
    );
};

export default Table;