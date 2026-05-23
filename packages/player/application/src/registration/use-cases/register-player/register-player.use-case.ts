import type { ClockPort } from "shared-kernels-time";
import type { RegisterPlayerInput } from "./register-player.input";
import { LoggerPort } from "shared-kernels-logging";
import {
  Nickname,
  Player,
  PlayerId,
  ExternalAccountId,
  type PlayerRepositoryPort,
  type NicknameUniquenessCheckerPort,
  type ExternalAccountIdUniquenessCheckerPort,
  NicknameAlreadyUsedError,
  ExternalAccountIdAlreadyUsedError,
} from "player-domain";
import { BusinessError } from "@couckedev/ddd-core";

export class RegisterPlayerUseCase {
  constructor(
    protected readonly clock: ClockPort,
    protected readonly playerRepository: PlayerRepositoryPort,
    protected readonly nicknameUniquenessChecker: NicknameUniquenessCheckerPort,
    protected readonly externalAccountIdUniquenessChecker: ExternalAccountIdUniquenessCheckerPort,
    protected readonly logger: LoggerPort,
  ) {}

  async execute(registerPlayerInput: RegisterPlayerInput): Promise<void> {
    try {
      const nickname = Nickname.create(registerPlayerInput.nickname);
      const playerId = PlayerId.create(registerPlayerInput.playerId);
      const externalAccountId = ExternalAccountId.create(
        registerPlayerInput.externalAccountId,
      );
      const isNicknameUnique =
        await this.nicknameUniquenessChecker.isUnique(nickname);
      if (!isNicknameUnique) {
        throw new NicknameAlreadyUsedError(nickname.value);
      }
      const isExternalAccountIdUnique =
        await this.externalAccountIdUniquenessChecker.isUnique(externalAccountId);
      if (!isExternalAccountIdUnique) {
        throw new ExternalAccountIdAlreadyUsedError();
      }
      const createdAt = this.clock.now();
      const newPlayer = Player.register(
        playerId,
        nickname,
        externalAccountId,
        createdAt,
      );
      await this.playerRepository.save(newPlayer);
    } catch (error) {
      if (error instanceof Error && !(error instanceof BusinessError)) {
        this.logger.error(error.message);
      }
      throw error;
    }
  }
}
