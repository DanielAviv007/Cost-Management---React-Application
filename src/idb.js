import { getFormattedYearMonth } from './utils'

export const idb = {};

idb.costsObjectStore = null;
idb.openCostsDB = (dbName, dbVersion) => new Promise((resolve, reject) => {
    const idbRequest = indexedDB.open(dbName, dbVersion);

    idbRequest.onerror = event => reject(`Could not open ${dbName} database. error: ${event.target.error}`);
    idbRequest.onsuccess = event => {
        const costsDB = event.target.result;

        costsDB.addCost = ({ sum, category, description }) => new Promise((resolve, reject) => {
            const transaction = costsDB.transaction(['costs'], 'readwrite');
            const costsObjectStore = transaction.objectStore('costs');

            transaction.oncomplete = () => resolve(true);
            transaction.onerror = event => reject(`Error adding cost: ${event.target.error}`);
            const costData = {
                sum: sum,
                category: category,
                description: description,
                date: getFormattedYearMonth(new Date())
            };
            costsObjectStore.add(costData);
        });

        costsDB.getMonthlyReport = date => new Promise((resolve, reject) => {
            const transaction = costsDB.transaction(['costs'], 'readonly');
            const costsObjectStore = transaction.objectStore('costs');
            const costsDates = costsObjectStore.index('date');
            const dateMatcher = IDBKeyRange.only(date);
            const request = costsDates.getAll(dateMatcher);

            request.onsuccess = event => {
                const monthlyCosts = event.target.result
                    .map(({ sum, description, category }) => ({ sum, description, category }));

                resolve(monthlyCosts);
            };
            request.onerror = event => reject(`Error getting costs: ${event.target.error}`);
        });

        resolve(costsDB);
    };
    idbRequest.onupgradeneeded = event => {
        const costsDB = event.target.result;

        if (!idb.costsObjectStore) {
            idb.costsObjectStore = costsDB.createObjectStore('costs', { keyPath: 'id', autoIncrement: true });
            idb.costsObjectStore.createIndex('date', 'date', { unique: false });
        }
    };
});
