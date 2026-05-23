import { ApiProperty } from "@nestjs/swagger";

export class BusinessErrorResponse {
  @ApiProperty({ example: 422, type: Number })
  statusCode!: number;

  @ApiProperty({ example: "Unprocessable Entity", type: String })
  error!: string;

  @ApiProperty({ example: "Nickname nickname is already used by another player", type: String })
  message!: string;

  @ApiProperty({ example: "ALREADY_USED", type: String })
  code!: string;
}
