// Simulação de uma Tabela Hash Extensível

class Bucket {
    constructor(depth) {
        this.depth = depth;
        this.items = [];
    }

    isFull(maxSize) {
        return this.items.length >= maxSize;
    }

    insert(key) {
        if (!this.items.includes(key)) this.items.push(key);
    }

    remove(key) {
        this.items = this.items.filter(k => k !== key);
    }

    contains(key) {
        return this.items.includes(key);
    }
}

class HashTable {
    constructor(bucketSize) {
        this.globalDepth = 1;
        this.bucketSize = bucketSize;
        this.directory = [new Bucket(1), new Bucket(1)];
    }

    hash(key) {
        return key & ((1 << this.globalDepth) - 1);
    }

    insert(key) {
        const index = this.hash(key);
        let bucket = this.directory[index];

        if (bucket.contains(key)) return; // avoid duplicates

        if (!bucket.isFull(this.bucketSize)) {
            bucket.insert(key);
        } else {
            // Split bucket
            if (bucket.depth === this.globalDepth) {
                this.doubleDirectory();
            }

            const newDepth = bucket.depth + 1;
            const newBucket1 = new Bucket(newDepth);
            const newBucket2 = new Bucket(newDepth);

            const oldItems = [...bucket.items, key];
            bucket.items = []; // Clear old bucket

            const mask = 1 << bucket.depth;

            for (let i = 0; i < this.directory.length; i++) {
                if (this.directory[i] === bucket) {
                    if ((i & mask) === 0) {
                        this.directory[i] = newBucket1;
                    } else {
                        this.directory[i] = newBucket2;
                    }
                }
            }

            for (const item of oldItems) {
                const newIndex = this.hash(item);
                this.directory[newIndex].insert(item);
            }
        }

        this.draw();
    }

    remove(key) {
        const index = this.hash(key);
        this.directory[index].remove(key);
        this.draw();
    }

    doubleDirectory() {
        this.globalDepth++;
        const size = this.directory.length;
        for (let i = 0; i < size; i++) {
            this.directory.push(this.directory[i]);
        }
    }

    draw() {
        const container = document.getElementById('hash-table');
        container.innerHTML = '';

        for (let i = 0; i < this.directory.length; i++) {
            const div = document.createElement('div');
            div.className = 'bucket';
            div.innerHTML = `<strong>${i.toString(2).padStart(this.globalDepth, '0')}</strong><br>${this.directory[i].items.join(', ')}`;
            container.appendChild(div);
        }
    }
}

// Inicializa a tabela e vincula ao HTML
const table = new HashTable(2);

function insertKey() {
    const key = parseInt(document.getElementById('keyInput').value);
    if (!isNaN(key)) {
        table.insert(key);
    }
}

function removeKey() {
    const key = parseInt(document.getElementById('keyInput').value);
    if (!isNaN(key)) {
        table.remove(key);
    }
}
