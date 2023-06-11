import { createSlice } from '@reduxjs/toolkit';

const tableSlice = createSlice({
  name: "table",
  initialState: {
    showTable: false,
    tableData: [],
    filteredRows: [],
    userInput: "",
    showUpdate: false,
  },
  reducers: {
    updateTableData(state, action){
      state.tableData =  action.payload;
    },
    setShowTable(state, action) {
        state.showTable = action.payload;
    },
    updateUserInput(state, action){
        state.userInput = action.payload;
    },
    updateFilteredRows(state, action) {
        state.filteredRows = action.payload;
    },
    toggleShowUpdate(state){
        state.showUpdate = !state.showUpdate;
    },
    deleteRow(state, action) {
      const rowIndex = action.payload;
      const deletedRow = state.filteredRows[rowIndex];
      state.filteredRows.splice(rowIndex, 1);
      const tableRowIndex = state.tableData.findIndex(row => {
        return Object.keys(row).every(key => row[key] === deletedRow[key]);
      });
      state.tableData.splice(tableRowIndex, 1);
    },
    viewAllRows(state) {
      state.filteredRows = state.tableData;
      state.userInput = "";
    }
  },
});

export const tableActions = tableSlice.actions;
export default tableSlice;
