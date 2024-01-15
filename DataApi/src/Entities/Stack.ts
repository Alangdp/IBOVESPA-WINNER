// class StackCollection<T> {
//   private storage: T[] = [];
//   private capacity: number;

//   push(item: T) {
//     if (this.isFull()) {
//       throw Error('Stack has reached max capacity, you cannot add more items');
//     }
//     // In the derived class, we can access protected properties of the abstract class
//     this.storage.push(item);
//   }

//   pop(): T | undefined {
//     return this.storage.pop();
//   }

//   peek(): T | undefined {
//     return this.storage[this.size() - 1];
//   }

//   // Implementation of the abstract method
//   isFull(): boolean {
//     return this.capacity === this.size();
//   }
// }
