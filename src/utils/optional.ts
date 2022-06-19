export class Optional<T> {
    private readonly value?: T;

    private constructor(arg: T | null | undefined) {
        this.value = (arg === null || arg === undefined ? undefined : arg);
    }

    public static empty<T>() {
        return new Optional<T>(null);
    }

    public static of<T>(arg: T | null | undefined): Optional<T> {
        return new Optional(arg);
    }

    public present(): boolean {
        return (this.value !== undefined);
    }

    public or(def: T): T {
        return (this.present() ? this.value! : def);
    }

    public orUndefined(): T | undefined {
        return (this.present() ? this.value! : undefined);
    }

    public map<U>(mapper: (t: T) => U | null | undefined): Optional<U> {
        return (this.present() ? Optional.of<U>(mapper(this.value!)) : Optional.empty<U>());
    }

    public filter(predicate: (t: T) => boolean): Optional<T> {
        return (this.present() && predicate(this.value!) ? this : Optional.empty<T>());
    }

    public ifPresent(fn: (t: T) => void): void {
        if (this.present())
            fn(this.value!);
    }
}
