import type { RegisterPlayerRequest } from "./requests/register-player-request.interface";

export interface PlayerApi {
    register(request: RegisterPlayerRequest): Promise<void>;
}