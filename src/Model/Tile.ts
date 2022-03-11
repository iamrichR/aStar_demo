import TilePixel from '../View/TilePixel';
import Entity from './Entities/Entity';
import Wall from './Entities/Wall';

class Tile {
    x: number;
    y: number;
    entity: Entity | null;
    observers: TilePixel[];

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.entity = null;
        this.observers = [];
    }

    toggleWall() {
        if (this.entity != null && this.entity.getEntityType() == 'Wall') {
            this.removeEntity();
        } else {
            this.createWall();
        }
        this.notifyObservers();
    }

    createWall() {
        const wall = new Wall(this.x, this.y);
        this.entity = wall;
        this.notifyObservers();
    }

    setEntity(entity: Entity) {
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

    subscribe(observer: TilePixel) {
        this.observers.push(observer);
    }

    unsubscribe(observer: any) {
        const idx = this.observers.indexOf(observer);
        if (idx != -1) this.observers.splice(idx, 1);
    }
}

export default Tile;