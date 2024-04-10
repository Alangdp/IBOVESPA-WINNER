export interface LocalStorageProps {
  key: string;
}

export default class LocalStorage<T, F extends T[]> {
  private key: string;

  constructor({ key }: LocalStorageProps) {
    this.key = key;
  }

  get(): F | null {
    const storedValue = localStorage.getItem(this.key);
    if (storedValue === null) {
      return null; 
    }

    const parsedValue: F = JSON.parse(storedValue);
    return parsedValue;
  }

  set(data: F): void {
    localStorage.setItem(this.key, JSON.stringify(data));
  }

  addItem(newItem: T): void {
    const existingItems = this.get();
    console.log(existingItems)
    if (Array.isArray(existingItems)) {
      const updatedItems = existingItems.concat(newItem) as F;
      this.set(updatedItems);
    } else {
      console.warn(`Tipo de dados inesperado no LocalStorage para a chave: ${this.key}. Inicializando com [${newItem}]`);
      this.set([newItem] as F);
    }
  }
}
