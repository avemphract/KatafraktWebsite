import type { Ref } from ".nuxt/imports";

export type RefMaybe<T> = Ref<T> | FakeRef<T>

export class FakeRef<T>{
    private _value:T;

    constructor(value:T){
        this._value = value;
    }
    public get value(){return this._value;}
    public set value(val:T) { this._value = val;}
}

export function fakeRef<T>(value:T){return new FakeRef<T>(value);}