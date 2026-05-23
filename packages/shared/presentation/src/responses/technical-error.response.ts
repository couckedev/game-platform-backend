import { ApiProperty } from "@nestjs/swagger";

export class TechnicalErrorResponse {
  @ApiProperty({ example: 500, type: Number })
  statusCode!: number;

  @ApiProperty({ example: "Internal Server Error", type: String })
  error!: string;

  @ApiProperty({ example: "An unexpected error occurred", type: String })
  message!: string;
}
