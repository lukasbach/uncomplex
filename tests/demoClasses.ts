export class ClassOnlyNativesA {
  constructor(public a: string, public b: number, public c: boolean) {
  }

  public toString() {
    return [this.a, this.b, this.c];
  }
}

export class ClassOnlyNativesB {
  constructor(public a: string, public b: number, public c: boolean) {
  }

  public toString() {
    return [this.a, this.b, this.c];
  }
}

export class ComposedClassOnlyA {
  constructor(public a: string, public b: number, public c: ClassOnlyNativesA) {
  }

  public toString() {
    return [this.a, this.b, this.c];
  }
}

export class ComposedClassOnlyB {
  constructor(public a: string, public b: number, public c: ClassOnlyNativesB) {
  }

  public toString() {
    return [this.a, this.b, this.c];
  }
}

export class ComposedClassAAndB {
  constructor(public a: string, public b: ClassOnlyNativesA, public c: ClassOnlyNativesB) {
  }

  public toString() {
    return [this.a, this.b, this.c];
  }
}