import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { tableActions } from '../store/tableSlice';
import {AiFillDelete} from 'react-icons/ai';

const UpdateModal = () => {
    const data = useSelector(state => state.table);
    const dispatch = useDispatch();
    const [updatedRows, setUpdatedRows] = useState({});

    const handleAChange = (e, index) => {
        const value = e.target.value;
        setUpdatedRows(prevState => ({
        ...prevState,
        [index]: { ...prevState[index], "LOCATION A STOCK": value }
        }));
    };
    const handleBChange = (e, index) => {
        const value = e.target.value;
        setUpdatedRows(prevState => ({
        ...prevState,
        [index]: { ...prevState[index], "LOC B STOCK ": value }
        }));
    };
    console.log(updatedRows);
    const handleClick = () => {
        const updatedRowsArray = data.filteredRows.map((row, index) => {
          if (updatedRows[index]) {
            return {
              ...row,
              "LOCATION A STOCK": updatedRows[index]["LOCATION A STOCK"] || row["LOCATION A STOCK"],
              "LOC B STOCK ": updatedRows[index]["LOC B STOCK "] || row["LOC B STOCK "]
            };
          }
          return row;
        });

        dispatch(tableActions.updateFilteredRows(updatedRowsArray));

        const updatedTableData = data.tableData.map((row, index) => {
            const matchingFilteredRow = updatedRowsArray.find(
                filteredRow => filteredRow["Part #"] === row["Part #"] && filteredRow["Alt.Part#"] === row["Alt.Part#"]
              );
            if (matchingFilteredRow) {
              return {
                ...row,
                "LOCATION A STOCK": matchingFilteredRow["LOCATION A STOCK"],
                "LOC B STOCK ": matchingFilteredRow["LOC B STOCK "]
              };
            }
            return row;
        });
      
        dispatch(tableActions.updateTableData(updatedTableData));

        setUpdatedRows({}); 
    }    
    const handleDelete = (index) => {
        dispatch(tableActions.deleteRow(index));
    }

    return (
        <div className='fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50'>
            <div className='bg-[#191825] p-4 rounded shadow-lg max-h-[720px] overflow-y-scroll'> 
                <div className='text-[24px] font-medium text-center text-gray-300'>
                    Update Inventory
                </div>
                <table className='mx-[100px] my-11'>
                    <thead className='text-[10px] text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                        <tr>
                            <th>Part #</th>
                            <th>Alt.Part#</th>
                            <th>Model</th>
                            <th>LOCATION A STOCK</th>
                            <th>LOC B STOCK</th>
                        </tr>
                    </thead>
                    <tbody>
                    {data.filteredRows.map((row, index) => (
                        <tr key={index} className='bg-gray-800 border-gray-700'>
                            <td className='px-4 py-2 text-[10px] font-medium whitespace-nowrap text-white'>{row["Part #"]}</td>
                            <td className='px-4 py-2 text-[10px] font-medium whitespace-nowrap text-white'>{row["Alt.Part#"]}</td>
                            <td className='px-4 py-2 text-[10px] font-medium whitespace-nowrap text-white'>{row["Model"]}</td>
                            <td className='px-4 py-2 text-[10px] font-medium whitespace-nowrap text-white'>
                                <input type="number" value={updatedRows[index]?.["LOCATION A STOCK"] || row["LOCATION A STOCK"]}
                                onChange={(e) => {handleAChange(e, index)}} className='text-black' min={0}/>
                            </td>
                            <td className='px-4 py-2 text-[10px] font-medium whitespace-nowrap text-white'>
                                <input type="number" value={updatedRows[index]?.["LOC B STOCK "] || row["LOC B STOCK "]}
                                onChange={(e) => {handleBChange(e, index)}} className='text-black' min={0}/>
                            </td>
                            <td className='px-4 py-2 bg-[#191825] text-[18px] font-medium whitespace-nowrap'>
                                <AiFillDelete className='text-red-700 transition-transform transform hover:scale-150'
                                onClick={() => {handleDelete(index)}}/>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table> 
                <div className='flex justify-end'>
                    <button className="px-3 py-1 text-lg w-[100px] bg-[#f31b1b] bg-opacity-50 hover:bg-[#f00d0d] text-gray-200  shadow-md rounded-xl"
                    onClick={() => {dispatch(tableActions.toggleShowUpdate())}}>
                        Close
                    </button>
                    <button className="px-3 py-1 text-lg w-[100px] ml-5  bg-[#5D5FEF] bg-opacity-50 hover:bg-blue-800 text-gray-200  shadow-md rounded-xl mr-8"
                    onClick={() => {handleClick();dispatch(tableActions.toggleShowUpdate())}}>
                        Save
                    </button>
                </div>      
            </div>
        </div>
    );
};

export default UpdateModal;