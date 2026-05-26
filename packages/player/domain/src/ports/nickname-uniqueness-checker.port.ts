import type { Nickname } from "../value-objects/nickname/nickname.value-object";

export interface NicknameUniquenessCheckerPort {
    isUnique(nickname: Nickname): Promise<boolean>;
}