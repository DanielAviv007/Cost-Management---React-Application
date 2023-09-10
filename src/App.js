// Daniel Aviv 209228154
// Yarin Naftali 208678565

// Import the Bootstrap CSS library to style the application.
import 'bootstrap/dist/css/bootstrap.min.css';

// Import the "Main" component and the custom CSS file.
import Main from './components/Main';
import './App.css';

// Define the main "App" component for the application.
function App() {
  // Render the main content of the application.
  return (
    <main className='d-flex flex-column justify-content-center align-items-center vh-100'>
      <Main />
    </main>
  );
}

// Export the "App" component as the default export of this module.
export default App;
