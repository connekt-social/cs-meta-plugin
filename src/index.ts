import { RJSFSchema, UiSchema } from "@rjsf/utils";
const components: {
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
}[] = [
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
];

const config = {
  components,
  url: null,
};

export default {
  config,
};
