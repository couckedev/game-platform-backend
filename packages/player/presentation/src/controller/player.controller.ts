import { Body, Controller, Get, Inject, NotFoundException, Post, Req, UseFilters, UseGuards } from "@nestjs/common";
import { GetPlayerUseCase, RegisterPlayerInput, RegisterPlayerUseCase } from "player-application";
import { v4 as uuidv4 } from "uuid";
import { ApiBearerAuth, ApiBody, ApiOAuth2, ApiResponse } from "@nestjs/swagger";
import {
  AuthenticatedUser,
  BusinessErrorResponse,
  JwtAuthGuard,
  TechnicalErrorResponse,
} from "shared-presentation";
import {
  ExternalAccountIdAlreadyUsedErrorFilter,
  NicknameAlreadyUsedErrorFilter,
} from "../exception-filters";
import { PlayerRegisteredResponse, PlayerResponse } from "../responses";
import { RegisterPlayerRequest } from "../requests";

@Controller("players")
export class PlayerController {
  constructor(
    @Inject(RegisterPlayerUseCase)
    private readonly registerPlayerUseCase: RegisterPlayerUseCase,
    @Inject(GetPlayerUseCase)
    private readonly getPlayerUseCase: GetPlayerUseCase,
  ) {}

  @Get("me")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOAuth2(["openid"])
  @ApiResponse({ status: 200, type: PlayerResponse })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  @ApiResponse({ status: 404, description: "Player not found" })
  @ApiResponse({ status: 500, type: TechnicalErrorResponse })
  async getMe(
    @Req() req: { user: AuthenticatedUser },
  ): Promise<PlayerResponse> {
    const player = await this.getPlayerUseCase.execute(req.user.externalAccountId);
    if (!player) {
      throw new NotFoundException("Player not found");
    }
    return player;
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOAuth2(["openid"])
  @ApiBody({ type: RegisterPlayerRequest })
  @ApiResponse({ status: 201, type: PlayerRegisteredResponse })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  @ApiResponse({ status: 422, type: BusinessErrorResponse })
  @ApiResponse({ status: 500, type: TechnicalErrorResponse })
  @UseFilters(new ExternalAccountIdAlreadyUsedErrorFilter(), new NicknameAlreadyUsedErrorFilter())
  async create(
    @Req() req: { user: AuthenticatedUser },
    @Body() registerPlayerRequest: RegisterPlayerRequest,
  ): Promise<PlayerRegisteredResponse> {
    const playerId = uuidv4();
    const registerPlayerInput: RegisterPlayerInput = {
      playerId,
      externalAccountId: req.user.externalAccountId,
      nickname: registerPlayerRequest.nickname,
    };
    await this.registerPlayerUseCase.execute(registerPlayerInput);
    return { playerId };
  }
}
