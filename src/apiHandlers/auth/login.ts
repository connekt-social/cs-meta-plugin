import { IncomingRequestHandler, Route } from "..";
import {
  InstagramBusinessAccount,
  getInstagramBusinessAccount,
  getPages,
} from "../../instagram/getHandles";
import { UserAccessToken } from "../../models/UserAccessToken";

export type AuthResponse = {
  status: string;
  authResponse: {
    accessToken: string;
    expiresIn: number;
    data_access_expiration_time: number;
    signedRequest: string;
    userID: string;
  };
};
async function handler({ request, reply, fastify }: IncomingRequestHandler) {
  fastify.sequelize.addModels([UserAccessToken]); //The model was synced earlier, the instance just does not know this
  const payload: AuthResponse = (request as any).body;

  const [user, created] = await UserAccessToken.findOrCreate({
    where: {
      userId: (request as any).user.id,
    },
    defaults: {
      userId: (request as any).user.id,
      token: payload.authResponse.accessToken,
      authResponse: payload.authResponse,
    },
  });

  if (!created) {
    user.update({
      userId: (request as any).user.id,
      token: payload.authResponse.accessToken,
      authResponse: payload.authResponse,
    });
  }

  try {
    const accounts = await getPages(payload.authResponse.accessToken);
    const instagramAccounts: InstagramBusinessAccount[] = await Promise.all(
      accounts
        .filter((account) => account.instagram_business_account?.id)
        .map((account) =>
          getInstagramBusinessAccount(
            account.instagram_business_account!.id,
            payload.authResponse.accessToken
          )
        )
    );

    return { message: "login successful", instagramAccounts };
  } catch (error: any) {
    console.error("Instagram login error", error.response?.data ?? error);
    return reply.badRequest(
      error.response?.data?.error?.message ||
        error.message ||
        "Instagram login error"
    );
  }
}

export const loginRoute: Route = {
  handler,
  method: "POST",
  path: "/auth/login/instagram",
};
