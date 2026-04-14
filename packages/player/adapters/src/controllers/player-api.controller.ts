import type {
  RegisterPlayerUseCase,
  RegisterPlayerInput,
} from "player-application";
import type { PlayerApi, RegisterPlayerRequest } from "player-contracts";

export class PlayerApiController implements PlayerApi {
  constructor(
    protected readonly registerPlayerUseCase: RegisterPlayerUseCase,
  ) {}
  register(request: RegisterPlayerRequest): Promise<void> {
    const registerPlayerInput: RegisterPlayerInput = {
        nickname: request.nickname,
        playerId: request.playerId
    };
    return this.registerPlayerUseCase.execute(registerPlayerInput);
  }
}
