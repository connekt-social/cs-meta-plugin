import { FastifyInstance } from "fastify";
import { getPages } from "../instagram/getHandles";
import { createAndPublishContainer } from "../instagram/postMedia";
import { UserAccessToken } from "../models/UserAccessToken";
import { RJSFSchema, UiSchema } from "@rjsf/utils";

export type ContentItem = {
  id: number;
  userId: number;
  contentFormatCode: string;
  data: any;
  title: string;
  key: string;
  caption?: string;
  thumbnail?: string;
  size: string;
  createdAt: string;
  updatedAt: string;
};

export type ContentType = {
  name: string;
  description: string;
  code: string;
  key: string;
  schema?: RJSFSchema;
  uiSchema?: UiSchema;
  titlePath?: string;
  captionPath?: string;
  thumbnailPath?: string;
};

export const publishHandler = async ({
  contentItem,
  fastify,
  contentType,
}: {
  contentItem: ContentItem;
  fastify: FastifyInstance;
  contentType: ContentType;
}) => {
  fastify.sequelize.addModels([UserAccessToken]); //The model was synced earlier, the instance just does not know this
  try {
    const token = await UserAccessToken.findOne({
      where: {
        userId: contentItem.userId,
      },
    });

    if (!token) {
      console.log("cs-meta-plugin: no token when trying to publish");
      throw {
        status: 401,
        message: "Please log in to facebook in the plugin settings page",
      };
    }

    const [account] = await getPages(token.token);

    if (!account.instagram_business_account?.id) {
      console.log(
        "cs-meta-plugin: Unable to locate instagram business account"
      );
      throw {
        status: 401,
        message: "Unable to locate instagram business account",
      };
    }

    switch (contentType.key) {
      case "STORY":
        await createAndPublishContainer({
          access_token: token.token,
          caption: contentItem.data.caption,
          url: contentItem.data.url,
          user_id: account.instagram_business_account?.id,
          media_type: "STORIES",
        });

        break;

      default:
        throw {
          status: 400,
          message: "Unsupported content type key",
        };
    }

    return {
      message: "Posted successfully",
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};
