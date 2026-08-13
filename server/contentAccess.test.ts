import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

function createStandardUserContext(): TrpcContext {
  return {
    user: {
      id: 8,
      openId: "standard-user",
      email: "reader@example.com",
      name: "Reader",
      loginMethod: "manus",
      role: "user",
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    },
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: { clearCookie: () => undefined } as TrpcContext["res"],
  };
}

describe("civic content access", () => {
  it("prevents a standard user from listing unpublished editorial resources", async () => {
    const caller = appRouter.createCaller(createStandardUserContext());

    await expect(caller.content.adminList()).rejects.toMatchObject({
      code: "FORBIDDEN",
    });
  });
});
