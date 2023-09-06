import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import CostForm from './components/CostForm'
import ReportGenerator from './components/ReportGenerator';

function App() {
  return (
    <main className="d-flex flex-column justify-content-center align-items-center vh-100">
      <header>
        <h1>Cost Form</h1>
      </header>
      <CostForm />
      <div className='mt-2 mb-2'></div>
      <ReportGenerator />
    </main>
  );
}

export default App;
