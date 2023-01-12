module.exports = class Queue{
	
	//Must add push, pop (as usual)
	//Also add method to see the size, return NULL when empty;

	constructor() {
		this.head = 0;
		this.tail = 0;
		this.list = [];
	}

	peek() {
		return this.list[this.head];
	}

	push(item) {
		this.list[this.tail] = item;
		this.tail++;
		return true;
	}

	pop() {
		if(this.isEmpty){
			return null;
		}
		const item = this.list[this.head];
		delete this.list[this.head];
		this.head++;
		return item;
	}

	get getSize() {
		return this.tail - this.head;
	}

	get isEmpty() {
		return this.getSize === 0;
	}

}