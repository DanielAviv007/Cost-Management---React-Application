import { getFormattedYearMonth } from './utils'

export const idb = {};

idb.openCostsDB = async (dbName, dbVersion) => new Promise((resolve, reject) => {
    const idbRequest = indexedDB.open(dbName, dbVersion);

    idbRequest.onerror = event => reject(`Could not open ${dbName} database. error: ${event.target.error}`);
    idbRequest.onsuccess = event => {
        const costsDB = event.target.result;

        costsDB.addCost = async ({ amount, category, description, date }) => new Promise((resolve, reject) => {
            const transaction = costsDB.transaction(["costs"], "readwrite");
            const costsObjectStore = transaction.objectStore("costs");

            transaction.oncomplete = () => resolve();
            transaction.onerror = event => reject(`Error adding cost: ${event.target.error}`);
            const costData = {
                amount: amount,
                category: category,
                description: description,
                date: getFormattedYearMonth(date)
            };
            costsObjectStore.add(costData);
        });

        costsDB.getMonthlyReport = async (date) => new Promise((resolve, reject) => {
            const transaction = costsDB.transaction(["costs"], "readonly");
            const costsObjectStore = transaction.objectStore("costs");
            const request = costsObjectStore.getAll();

            request.onsuccess = event => {
                const costs = event.target.result;
                const monthlyCosts = costs.filter(cost => cost.date == date);

                resolve(monthlyCosts);
            }
            request.onerror = event => reject(`Error getting costs: ${event.target.error}`);
        });

        resolve(costsDB);
    };
    idbRequest.onupgradeneeded = event => {
        const costsDB = event.target.result;
        const costsObjectStore = costsDB.createObjectStore("costs", { keyPath: "id", autoIncrement: true });

        costsObjectStore.createIndex("amount", "amount", { unique: false });
        costsObjectStore.createIndex("category", "category", { unique: false });
        costsObjectStore.createIndex("description", "description", { unique: false });
        costsObjectStore.createIndex("date", "date", { unique: false });
    };
});
