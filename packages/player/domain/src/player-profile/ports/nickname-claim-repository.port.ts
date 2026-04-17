import type { NicknameClaim } from "../aggregates/nickname-claim/nickname-claim.aggregate";
import type { Nickname } from "../value-objects/nickname/nickname.value-object";

export interface NicknameClaimRepositoryPort {
  load(nickname: Nickname): Promise<NicknameClaim | null>;
  save(nicknameClaim: NicknameClaim): Promise<void>;
}
