import Tile from '../Superclasses/Tile';
import TilePixel from '../View/TilePixel';
import Entity from './Entities/Entity';
import Wall from './Entities/Wall';

class TileModel extends Tile {
    tileX: number;
    tileY: number;
    entity: Entity | null;
    observers: TilePixel[];

    constructor(tileX: number, tileY: number) {
        super(tileX, tileY);
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
        const wall = new Wall(this.tileX, this.tileY);
        this.entity = wall;
        this.notifyObservers();
    }

    setEntity(entity: Entity) {
        entity.setX(this.tileX);
        entity.setY(this.tileY);
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

export default TileModel;
