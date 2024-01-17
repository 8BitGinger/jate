import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  try {
    console.log('PUT to DB');
    const jateDB = await openDB('jate', 1);
    const tx = jateDB.transaction('jate', 'readwrite');
    const store = tx.objectStore('jate');
    const request = store.put({ id: 1, value: content });
    const result = await request;
    console.log('Data Saved', result);
  } catch (err) {
    console.error('putDb not implemented');
    console.log(err);
  }
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  try {
    console.log('GET from DB');
    const jateDB = await openDB('jate', 1);
    const tx = jateDB.transaction('jate', 'readonly');
    const store = tx.objectStore('jate');
    const request = store.getAll();
    const result = await request;
    console.log('Data Retrieved', result);
    console.log(result);
    return result;
  } catch {
    console.error('getDb not implemented');
  }
};

initdb();
