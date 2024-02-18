import { JSONFileSyncPreset } from 'lowdb/node';
export default class Database {
    path;
    db;
    toUpdate = [];
    constructor(path) {
        this.path = path;
        this.db = JSONFileSyncPreset(path, []);
        this.toUpdate = this.db.data ?? [];
    }
    add(instance, autocommit = false) {
        this.toUpdate.push(instance);
        if (autocommit)
            this.commit();
    }
    commit() {
        this.db.data = this.toUpdate;
        this.db.write();
        return new Database(this.path);
    }
    clear() {
        this.toUpdate = [];
    }
    findAll(callback) {
        const data = this.db.data;
        const dataFiltred = [];
        for (const instance of data) {
            if (callback(instance))
                dataFiltred.push(instance);
        }
        if (dataFiltred.length === 0)
            return null;
        return dataFiltred;
    }
    find(callback) {
        const data = this.db.data;
        for (const instance of data) {
            if (callback(instance))
                return instance;
        }
        return null;
    }
    get() {
        return this.db.data;
    }
    deleteBy(callback, autocommit = false) {
        const data = this.db.data;
        const dataFiltred = [];
        for (const instance of data) {
            if (!callback(instance))
                dataFiltred.push(instance);
        }
        this.toUpdate = dataFiltred;
        if (dataFiltred.length === 0)
            return null;
        if (autocommit)
            this.commit();
        return dataFiltred;
    }
}
