import { handler } from "./apiHandlers";
import path from "path";
import { UserAccessToken } from "./models/UserAccessToken";
import { ContentType, publishHandler } from "./publish/publishHandler";

const components: (
  | {
      type: "BACKEND";
      function: "CONTENTTYPE";
      data: ContentType;
    }
  | {
      type: "BACKEND";
      function: "PLUGIN_REST_API";
      handler: (requestHandler: any) => Promise<any>;
    }
  | {
      type: "FRONTEND";
      function: "PLUGIN_SETTINGS_TAB";
      data: { entryPoint: string; componentName: string };
    }
  | {
      type: "BACKEND";
      function: "CONTENT_PUBLISH";
      handler: (contentItem: any) => Promise<any>;
    }
)[] = [
  {
    type: "BACKEND",
    function: "CONTENTTYPE",
    data: {
      name: "Story",
      description: "Post to instagram stories",
      code: "IMAGE",
      key: "STORY",
    },
  },
  {
    type: "BACKEND",
    function: "PLUGIN_REST_API",
    handler: handler,
  },
  {
    type: "BACKEND",
    function: "CONTENT_PUBLISH",
    handler: publishHandler,
  },
  {
    type: "FRONTEND",
    function: "PLUGIN_SETTINGS_TAB",
    data: {
      entryPoint: path.join(__dirname, "/static/cs-meta-plugin.cjs"),
      componentName: "AccountLinkingTab",
    },
  },
];

const config = {
  components,
  url: null,
  models: [UserAccessToken],
};

export default {
  config,
};
