import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { tableActions } from '../store/tableSlice';
import CSVReader from 'react-csv-reader';
import { useRef } from 'react';
import UpdateModal from './UpdateModal';
import Papa from 'papaparse';


const Input = () => {
    const data = useSelector((state) => state.table);
    const dispatch = useDispatch();
    const userInput = useRef();
    const inputVal = useRef();
    console.log(data);
    const handleOnchange = (e) => {
        dispatch(tableActions.updateTableData(e));
        dispatch(tableActions.updateFilteredRows(e));
    }
    const handleOnSubmit = () => {      
        if(userInput.current.children[0].children[0].children[0].value){
            userInput.current.children[1].classList.remove("hidden");
            userInput.current.children[2].classList.remove("hidden");  
            userInput.current.children[3].classList.remove("hidden");
            dispatch(tableActions.setShowTable(true));
        }else{
            alert("Please choose a file to import");
        }        
    }
    useEffect(() => {
        if (data.userInput && data.userInput.length >= 3) {
          const filteredRows = data.tableData.filter((row) => {
            const part = row['Part #'] ? row['Part #'].trim() : '';
            const altPart = row['Alt.Part#'] ? row['Alt.Part#'].trim() : '';
            return part.includes(data.userInput) || altPart.includes(data.userInput);
          });
          dispatch(tableActions.updateFilteredRows(filteredRows));
        }
      }, [data.userInput, data.tableData]);
      
    const handleFilter = () => {
        const userinput = inputVal.current.value;
        dispatch(tableActions.updateUserInput(userinput));
        if (userinput.length < 3) {
            alert("Please enter 3 or more characters");
            return; 
        }else{
            userInput.current.children[1].children[3].classList.remove("hidden");
        }
    }
    const convertToCSV = () => {
        const csv = Papa.unparse(data.tableData);
        return csv;
    };      
    const handleExport = () => {
        const csv = convertToCSV();
        const csvData = new Blob([csv], { type: 'text/csv' });
        const csvURL = URL.createObjectURL(csvData);
        const tempLink = document.createElement('a');
        tempLink.href = csvURL;
        tempLink.setAttribute('download', 'tableData.csv');
        tempLink.click();
    }
    const handleViewAll = () => {
        inputVal.current.value = "";
        dispatch(tableActions.viewAllRows());
        
    }

    return (
        <div className='text-gray-300 mt-9' ref={userInput}>
            <div className='mx-[100px] flex items-center'>
                <CSVReader onFileLoaded={(e) => {handleOnchange(e)}} parserOptions={{ header: true, skipEmptyLines: true }} /> 
                <button className='bg-gray-700 rounded-xl py-2 px-5 font-medium transition-transform transform hover:scale-110' onClick={() => {handleOnSubmit()}}>
                        Import 
                </button>
            </div> 
            <div className='mx-[100px] mt-5 hidden'>    
                <div>
                    User Input:
                </div>
                <input type="text" className='bg-transparent outline-none border-[1px] border-gray-600 px-2' ref={inputVal}/>
                <button className='bg-gray-700 rounded-xl py-2 px-5 font-medium ml-[100px] transition-transform transform hover:scale-110' onClick={() => {handleFilter()}}>
                    Filter
                </button>
                <button className='bg-gray-700 rounded-xl py-2 px-5 font-medium ml-[30px] transition-transform transform hover:scale-110 hidden' onClick={() => {handleViewAll()}}>
                    View All
                </button>
            </div> 
            <div className='float-right mr-[100px] hidden'>
                <button className='bg-blue-700 hover:bg-blue-800 transition-transform transform hover:scale-110 py-2 px-5 rounded-xl font-medium text-gray-300'
                onClick={() => {handleExport()}}>
                    Export CSV
                </button>
            </div>   
            <div className='flex justify-end mx-[100px] mt-14 hidden'>
                <button className='bg-blue-700 hover:bg-blue-800 transition-transform transform hover:scale-110 py-2 px-5 rounded-xl font-medium text-gray-300'
                onClick={() => {dispatch(tableActions.toggleShowUpdate())}}>
                    Update Inventory
                </button>
                {data.showUpdate && <UpdateModal />}
            </div>        
        </div>
    );
};

export default Input;