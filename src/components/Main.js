// Daniel Aviv 209228154
// Yarin Naftali 208678565

// Import the "CostForm" and "Report" components.
import CostForm from './CostForm';
import Report from './Report';

// Define the "Main" component responsible for rendering the main content of the application.
function Main() {
    // Render both the "CostForm" and "Report" components within an empty fragment.
    return (
        <>
            <CostForm />
            <Report />
        </>
    );
}

// Export the "Main" component as the default export of this module.
export default Main;
