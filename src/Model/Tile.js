import Wall from "./Entities/Wall";

class Tile {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.entity = null;
        this.observers = [];
    }

    toggleWall() {
        if (typeof this.entity == Wall) {
            this.removeEntity();
        } else {
            this.createWall();
        }
        this.notifyObservers();
    }

    createWall() {
        let wall = new Wall(this.x, this.y);
        this.entity = wall;
        this.notifyObservers();
    }

    setEntity(entity) {
        entity.setX(this.x);
        entity.setY(this.y);
        this.entity = entity;
        this.notifyObservers();
    }

    removeEntity() {
        this.entity = null;
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
            entity: this.entity,
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
