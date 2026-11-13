class Node {
    constructor(val, priority) {
        this.val = val;
        this.priority = priority;
    }
}

class PriorityQueue {
    constructor() {
        this.values = [];
    }

    add(val, priority) {
        const newItem = new Node(val, priority);
        let newItemIdx = this.values.length;

        this.values.push(newItem);

        while(newItemIdx) {
            const parentIdx = Math.floor((newItemIdx - 1) / 2) ;

            if(this.values[parentIdx].priority > newItem.priority) {
                [this.values[parentIdx], this.values[newItemIdx]] = [this.values[newItemIdx], this.values[parentIdx]];
                newItemIdx = parentIdx;
            } else break;
        }

        return this.values;
    }

    get() {
        const value = this.values[0];
        const lastValue = this.values.pop();

        if(!this.values.length) return value;

        this.values[0] = lastValue;
        let parent = 0;

        while(true) {
            let higherChild = null;

            const leftChild = (parent * 2) + 1;
            if(leftChild > this.values.length - 1) break;

            const rightChild = (parent * 2) + 2;
            if(rightChild > this.values.length - 1) higherChild = leftChild;
            else higherChild = (this.values[leftChild].priority < this.values[rightChild].priority)? leftChild : rightChild;

            if(this.values[parent].priority > this.values[higherChild].priority) {
                [this.values[higherChild], this.values[parent]] = [this.values[parent], this.values[higherChild]];
                parent = higherChild;
            } else break;
        }

        return value;
    }
}

export default PriorityQueue;
