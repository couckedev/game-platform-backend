---
"player-api": minor
"player-application": minor
"player-domain": minor
"player-infrastructure": minor
"player-presentation": minor
"shared-infrastructure": minor
"shared-kernels-logging": minor
"shared-kernels-time": minor
"shared-presentation": minor
---

### Player Registration

**What**: End-to-end player registration and retrieval across the full DDD stack — domain model, application use cases, persistence adapters, NestJS wiring, and REST API.

**Why**: Foundational feature of the game platform. A player identity with a unique nickname, bound to an external account (Keycloak), is the prerequisite for any game session, matchmaking, or score tracking.

**How**:
- `shared-kernels-time`: `IClock` port, `Timestamp` value object
- `shared-kernels-logging`: `ILogger` port
- `shared-infrastructure`: `SystemClockAdapter`, `WinstonLoggerAdapter`, `FixedClock` (test), `SilentLogger` (test), `PostgresTestContainer` utility
- `shared-presentation`: JWT auth guard, `BusinessExceptionFilter`, `TechnicalExceptionFilter`, `SharedModule`
- `player-domain`: `Player` aggregate root, `Nickname` and `ExternalAccountId` value objects with validation invariants (min/max length, allowed characters, minimum letter count), `IPlayerRepository`, `INicknameUniquenessChecker`, `IExternalAccountIdUniquenessChecker` ports
- `player-application`: `RegisterPlayer` use case, `GetPlayer` use case
- `player-infrastructure`: `DrizzlePlayerRepository`, `DrizzleNicknameUniquenessChecker`, `DrizzleExternalAccountIdUniquenessChecker` adapters + in-memory test doubles + integration tests
- `player-presentation`: `PlayerController`, `PlayerModule`, domain-specific exception filters, request/response DTOs
- `player-api`: `POST /players` and `GET /players/:id` endpoints, Swagger documentation
