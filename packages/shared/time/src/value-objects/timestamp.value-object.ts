export class Timestamp {
  private constructor(public readonly value: string) {}

  static fromISOString(value: string): Timestamp {
    if (value.trim() === "") {
      throw new RangeError("Timestamp cannot be empty");
    }

    if (!value.endsWith("Z") || Number.isNaN(Date.parse(value))) {
      throw new RangeError("Timestamp must be a valid UTC ISO-8601 string");
    }

    return new Timestamp(value);
  }

  equals(other: Timestamp): boolean {
    return this.value === other.value;
  }

  toString(): string {
    return this.value;
  }
}