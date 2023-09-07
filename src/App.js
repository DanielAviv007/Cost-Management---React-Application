import 'bootstrap/dist/css/bootstrap.min.css';

import CostForm from './components/CostForm'
import Report from './components/Report';

function App() {
  return (
    <main className="d-flex flex-column justify-content-center align-items-center vh-100">
      <CostForm />
      <Report />
    </main>
  );
}

export default App;
