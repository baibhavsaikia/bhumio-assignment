import Input from './components/Input';
import Header from './components/Header';
import { useSelector } from 'react-redux';
import Table from './components/Table.js';

function App() {
  const data = useSelector(state => state.table);
  return (
    <div className="App bg-[#191825] min-h-screen">
      <Header />
      <Input />
      {data.showTable && <Table />}
    </div>
  );
}

export default App;
