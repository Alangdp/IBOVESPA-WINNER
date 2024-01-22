import { Low, LowSync } from 'lowdb';
import { JSONFile, JSONFileSyncPreset } from 'lowdb/node';

export default class Database<T> {
  private db: LowSync<T[]>;
  private toUpdate: T[] = [];

  constructor(path: string) {
    this.db = JSONFileSyncPreset<T[]>(path, []);
    this.toUpdate = this.db.data ?? [];
  }

  add(instance: T) {
    this.toUpdate.push(instance);
  }

  commit() {
    this.db.data = this.toUpdate;
    this.db.write();
  }

  clear() {
    this.toUpdate = [];
  }

  findAll(callback: (instance: T) => boolean) {
    const data = this.db.data;
    const dataFiltred: T[] = [];

    for (const instance of data) {
      if (callback(instance)) dataFiltred.push(instance);
    }

    if (dataFiltred.length === 0) return null;
    return dataFiltred;
  }

  find(callback: (instance: T) => boolean) {
    const data = this.db.data;

    for (const instance of data) {
      if (callback(instance)) return instance;
    }

    return null;
  }

  get() {
    return this.db.data;
  }

  deleteBy(callback: (instance: T) => boolean) {
    const data = this.db.data;
    const dataFiltred: T[] = [];

    for (const instance of data) {
      if (!callback(instance)) dataFiltred.push(instance);
    }

    this.toUpdate = dataFiltred;

    if (dataFiltred.length === 0) return null;
    return dataFiltred;
  }
}
