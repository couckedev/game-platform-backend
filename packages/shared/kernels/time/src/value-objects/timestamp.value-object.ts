export class Timestamp {
  private constructor(public readonly value: string) {}

  static fromISOString(isoString: string): Timestamp {
    if (isoString.trim() === "") {
      throw new RangeError("Date ISO string cannot be empty");
    }

    const timestampMillisecondValue = Date.parse(isoString);
    if (!isoString.endsWith("Z") || Number.isNaN(timestampMillisecondValue)) {
      throw new RangeError("Timestamp must be a valid UTC ISO-8601 string");
    }

    return new Timestamp(new Date(timestampMillisecondValue).toISOString());
  }

  equals(other: Timestamp): boolean {
    return this.value === other.value;
  }

  toString(): string {
    return this.value;
  }
}