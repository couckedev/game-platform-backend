import { ApiProperty } from "@nestjs/swagger";

export class PlayerRegisteredResponse {
  @ApiProperty({
    example: "2079c030-8a04-421a-8d79-efe827b38524",
    description: "Generated player id for this registered player",
    type: String,
    format: "uuid",
  })
  playerId!: string;
}
