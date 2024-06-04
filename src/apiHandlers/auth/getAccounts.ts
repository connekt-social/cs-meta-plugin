import { IncomingRequestHandler, Route } from "..";
import {
  InstagramBusinessAccount,
  getInstagramBusinessAccount,
  getPages,
} from "../../instagram/getHandles";
import { UserAccessToken } from "../../models/UserAccessToken";

async function handler({ request, reply, fastify }: IncomingRequestHandler) {
  fastify.sequelize.addModels([UserAccessToken]); //The model was synced earlier, the instance just does not know this

  const user = await UserAccessToken.findOne({
    where: {
      userId: (request as any).user.id,
    },
  });

  if (!user) {
    return reply.unauthorized("Auth token not found");
  }

  try {
    const accounts = await getPages(user.token);
    const instagramAccounts: InstagramBusinessAccount[] = await Promise.all(
      accounts
        .filter((account) => account.instagram_business_account?.id)
        .map((account) =>
          getInstagramBusinessAccount(
            account.instagram_business_account!.id,
            user.token
          )
        )
    );

    return { message: "login successful", instagramAccounts };
  } catch (error: any) {
    console.error("Get instagram accounts", error.response?.data ?? error);
    return reply.badRequest(
      error.response?.data?.error?.message ||
        error.message ||
        "Get instagram accounts"
    );
  }
}

export const getInstagramAuthAccounts: Route = {
  handler,
  method: "GET",
  path: "/auth/getAccounts/instagram",
};
