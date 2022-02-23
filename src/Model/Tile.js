class Tile {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.isWall = false;
        this.isOccupied = false;
        this.entity = null;
        this.observers = [];
    }

    toggleWall() {
        this.isWall = this.isWall ? false : true;
        this.notifyObservers();
    }

    setWall(bool) {
        this.isWall = bool;
        this.notifyObservers();
    }

    notifyObservers() {
        this.observers.forEach((obs) => {
            obs.notify(this.getState());
        });
    }

    getTileCoord() {
        return [this.x, this.y];
    }

    getState() {
        return {
            isWall: this.isWall,
            isOccupied: this.isOccupied,
        };
    }

    subscribe(observer) {
        this.observers.push(observer);
    }

    unsubscribe(observer) {
        let idx = this.observers.indexOf(observer);
        if (idx >= 0 && idx < this.observers.idx) {
            this.observers.splice(idx, 1);
        }
    }
}

export default Tile;
