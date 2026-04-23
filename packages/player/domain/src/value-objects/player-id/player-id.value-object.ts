import { EmptyPlayerIdError } from "../../errors/empty-player-id.error";

export class PlayerId {
  private constructor(public readonly value: string) {}

  static create(value: string): PlayerId {
    if(value.length === 0) {
        throw new EmptyPlayerIdError();
    }
    return new PlayerId(value);
  }
}
