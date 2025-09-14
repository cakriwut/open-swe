import jsonwebtoken from "jsonwebtoken";

/**
 * Generates a JWT for GitHub App authentication
 */
export function generateJWT(appId: string, privateKey: string): string {
  const now = Math.floor(Date.now() / 1000);

  const payload = {
    iat: now,
    exp: now + (9 * 60), // 9 minutes
    iss: appId,
  };

  return jsonwebtoken.sign(payload, privateKey, { algorithm: "RS256" });
}
