// Daniel Aviv 209228154
// Yarin Naftali 208678565

// Import the "utlisObj" object from the "utils" module.
import { utlisObj } from './utils';

// Create a namespace object named "idb" to handle interactions with IndexedDB.
export const idb = {};

// Define a function "openCostsDB" to open a IndexedDB database with a given name and version.
idb.openCostsDB = (dbName, dbVersion) => new Promise((resolve, reject) => {
    // Check if IndexedDB is available in the browser.
    if (!indexedDB) {
        reject('IndexedDB is not found!');
        return;
    }

    // Open the IndexedDB database with the provided name and version.
    const idbRequest = indexedDB.open(dbName, dbVersion);

    // Handle errors during the database opening process.
    idbRequest.onerror = event => reject(`Could not open ${dbName} database. Error: ${event.target.error}`);
    idbRequest.onsuccess = event => {
        // Once the database is successfully opened, get a reference to it.
        const costsDB = event.target.result;

        // Add a "addCost" method to the database to insert cost data.
        costsDB.addCost = ({ sum, category, description }) => new Promise((resolve, reject) => {
            const transaction = costsDB.transaction(['costs'], 'readwrite');
            const costsObjectStore = transaction.objectStore('costs');

            transaction.oncomplete = () => resolve(true);
            transaction.onerror = event => reject(`Error adding cost: ${event.target.error}`);

            // Create a cost data object and add it to the "costs" object store.
            const costData = {
                sum: sum,
                category: category,
                description: description,
                date: utlisObj.getFormattedYearMonth(new Date())
            };
            costsObjectStore.add(costData);
        });

        // Add a "getMonthlyReport" method to the database to retrieve monthly cost data.
        costsDB.getMonthlyReport = date => new Promise((resolve, reject) => {
            const transaction = costsDB.transaction(['costs'], 'readonly');
            const costsObjectStore = transaction.objectStore('costs');
            const costsDates = costsObjectStore.index('date');
            const dateMatcher = IDBKeyRange.only(date);
            const request = costsDates.getAll(dateMatcher);

            request.onsuccess = event => {
                // Map the retrieved data to a simplified format and resolve the promise.
                const monthlyCosts = event.target.result
                    .map(({ sum, description, category }) => ({ sum, description, category }));

                resolve(monthlyCosts);
            };
            request.onerror = event => reject(`Error getting costs: ${event.target.error}`);
        });

        // Resolve the promise with the database instance.
        resolve(costsDB);
    };

    // Handle database version upgrades.
    idbRequest.onupgradeneeded = event => {
        const costsDB = event.target.result;

        // Create an object store for costs and an index for date-based queries.
        if (!idb.costsObjectStore) {
            idb.costsObjectStore = costsDB.createObjectStore('costs', { keyPath: 'id', autoIncrement: true });
            // Make date as index so it will be easier to filter by dates.
            idb.costsObjectStore.createIndex('date', 'date', { unique: false });
        }
    };
});
