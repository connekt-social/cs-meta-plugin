import { RJSFSchema, UiSchema } from "@rjsf/utils";
import { handler } from "./apiHandlers";
import path from "path";
import { UserAccessToken } from "./models/UserAccessToken";
const components: (
  | {
      type: "BACKEND";
      function: "CONTENTTYPE";
      data: {
        name: string;
        description: string;
        code: string;
        schema: RJSFSchema;
        uiSchema?: UiSchema;
        titlePath?: string;
        captionPath?: string;
        thumbnailPath?: string;
      };
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
)[] = [
  {
    type: "BACKEND",
    function: "CONTENTTYPE",
    data: {
      name: "Image",
      description:
        "An Image. Can be used in a normal post, a carousel, or a story.",
      code: "IMAGE",
      schema: {
        type: "object",
        properties: {
          url: { type: "string" },
          title: { type: "string" },
          caption: { type: "string" },
        },
        required: ["url"],
      },
      uiSchema: {
        url: {
          "ui:widget": "FileUploadTextField",
        },
      },
      captionPath: "caption",
      thumbnailPath: "url",
      titlePath: "title",
    },
  },
  {
    type: "BACKEND",
    function: "PLUGIN_REST_API",
    handler: handler,
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
