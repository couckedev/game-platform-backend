import { ApiProperty } from "@nestjs/swagger";

export class PlayerResponse {
  @ApiProperty({
    example: "2079c030-8a04-421a-8d79-efe827b38524",
    description: "Player id",
    type: String,
    format: "uuid",
  })
  playerId!: string;

  @ApiProperty({
    example: "CoolGamer42",
    description: "Player nickname",
    type: String,
  })
  nickname!: string;

  @ApiProperty({
    example: "2026-01-01T00:00:00.000Z",
    description: "Date the player registered",
    type: String,
    format: "date-time",
  })
  createdAt!: string;

  @ApiProperty({
    example: true,
    description: "Whether the player is currently online",
    type: Boolean,
  })
  isOnline!: boolean;
}
