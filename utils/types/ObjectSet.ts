export interface Equalable {
    equals(e1: Equalable): boolean;
}

export default class ObjectSet<T extends Equalable> extends Set<T> {
    public add(value: T):this {
        let found = false;
        for (const item of this) {
            if (value.equals(item)) {
                found = true;
                break;
            }
        }
        if (!found) {
            super.add(value);
        }
        return this;
    }

}