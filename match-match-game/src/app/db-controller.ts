import IUserDB from "../typing/interfaces/user-db";

class DBController {
  db: null | IDBDatabase = null;
  openRequest: IDBOpenDBRequest;

  constructor() {
    this.openRequest = indexedDB.open('match-match', 1);

    this.openRequest.onerror = () => {
      throw new Error('DBController error');
    };

    this.openRequest.onupgradeneeded = () => {
      this.db = this.openRequest.result;

      if (!this.db.objectStoreNames.contains('players')) {
        const players = this.db.createObjectStore('players', {
          keyPath: 'id',
          autoIncrement: true,
        });
        players.createIndex('score', 'score', { unique: false });
      }
    };

    this.openRequest.onsuccess = () => {
      this.db = this.openRequest.result;
    };
  }

  getPlayersByScore = (): Promise<IUserDB[]> => {
    if (!this.db) {
      return new Promise<IUserDB[]>((resolve, reject) => {
        reject();
      });
    }

    const result: IUserDB[] = [];

    const transition = this.db.transaction(['players'], 'readonly');
    const objectStore = transition.objectStore('players');
    const scoreIndex = objectStore.index('score');
    const scoreIndexCursor = scoreIndex.openCursor(null, 'next');

    scoreIndexCursor.onsuccess = () => {
      const cursor = scoreIndexCursor.result;

      if (cursor && result.length <= 10) {
        result.push(cursor.value);
        cursor.continue();
      }
    };

    return new Promise<IUserDB[]>((resolve): void => {
      transition.oncomplete = (): void => {
        resolve(result);
      };
    });
  };

  addPlayer = (player: IUserDB): void => {
    if (!this.db) {
      return;
    }
    const request = this.db
      .transaction(['players'], 'readwrite')
      .objectStore('players')
      .add(player);

    request.onerror = () => {
      // console.log('Some error.');
    };

    request.onsuccess = () => {
      // console.log('Player added');
    };
  };
}

export default DBController;
