import type { RegisterPlayerOutput } from './register-player-output.interface';

export class RegisterPlayerUseCase {
  constructor(private readonly output: RegisterPlayerOutput) {}

  execute(nickname: string): void {
    if (nickname.length < 5) {
      this.output.present({
        status: 'FAILURE',
        rejectionReason: 'NICKNAME_TOO_SHORT',
      });
      return;
    }
    this.output.present({ status: 'SUCCESS' });
  }
}
