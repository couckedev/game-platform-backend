import {
  createLocalJWKSet,
  exportJWK,
  generateKeyPair,
  JWTPayload,
  JWTVerifyGetKey,
  SignJWT,
} from 'jose';

export class JwtdentityProviderServer {
  private constructor(
    private readonly privateKey: CryptoKey,
    public readonly keySource: JWTVerifyGetKey,
  ) {}

  static async createInstance(): Promise<JwtdentityProviderServer> {
    const { publicKey, privateKey } = await generateKeyPair('RS256');
    const jwk = await exportJWK(publicKey);
    return new JwtdentityProviderServer(privateKey, createLocalJWKSet({ keys: [jwk] }));
  }

  generateTokenFor(payload: JWTPayload): Promise<string> {
    return new SignJWT(payload).setProtectedHeader({ alg: 'RS256' }).sign(this.privateKey);
  }
}
