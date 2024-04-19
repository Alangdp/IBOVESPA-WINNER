export interface LocalStorageProps {
  key: string;
}

export default class LocalStorage<T> {
  private key: string;

  constructor({ key }: LocalStorageProps) {
    this.key = key;
  }

  get(): T | {} {
    try {
      const storedValue = localStorage.getItem(this.key);
      const parsedValue: T = JSON.parse(storedValue || "");
      return parsedValue;
    } catch (error) {
      return {} as T;
    }
  }

  set(data: T): void {
    localStorage.setItem(this.key, JSON.stringify(data));
  }

  addItem(newItem: T): void {
    const existingItems = this.get() || {}; // Get existing items or initialize as an empty object if null
    const updatedItems = {
      ...existingItems,
      ...newItem,
    };
    this.set(updatedItems);
  }
}
