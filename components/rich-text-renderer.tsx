import {
  documentToReactComponents,
  Options,
} from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES, Document } from "@contentful/rich-text-types";
import Image from "next/image";
import Link from "next/link";

interface RichTextRendererProps {
  content: Document;
}

const options: Options = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => (
      <p className="mb-4 text-gray-700 leading-relaxed">{children}</p>
    ),
    [BLOCKS.HEADING_1]: (node, children) => (
      <h1 className="text-4xl font-bold text-gray-900 mb-4 mt-8">{children}</h1>
    ),
    [BLOCKS.HEADING_2]: (node, children) => (
      <h2 className="text-3xl font-bold text-gray-900 mb-4 mt-6">{children}</h2>
    ),
    [BLOCKS.HEADING_3]: (node, children) => (
      <h3 className="text-2xl font-bold text-gray-900 mb-3 mt-5">{children}</h3>
    ),
    [BLOCKS.HEADING_4]: (node, children) => (
      <h4 className="text-xl font-bold text-gray-900 mb-3 mt-4">{children}</h4>
    ),
    [BLOCKS.HEADING_5]: (node, children) => (
      <h5 className="text-lg font-bold text-gray-900 mb-2 mt-4">{children}</h5>
    ),
    [BLOCKS.HEADING_6]: (node, children) => (
      <h6 className="text-base font-bold text-gray-900 mb-2 mt-3">
        {children}
      </h6>
    ),
    [BLOCKS.UL_LIST]: (node, children) => (
      <ul className="list-disc list-inside mb-4 space-y-2">{children}</ul>
    ),
    [BLOCKS.OL_LIST]: (node, children) => (
      <ol className="list-decimal list-inside mb-4 space-y-2">{children}</ol>
    ),
    [BLOCKS.LIST_ITEM]: (node, children) => (
      <li className="text-gray-700">{children}</li>
    ),
    [BLOCKS.QUOTE]: (node, children) => (
      <blockquote className="border-l-4 border-blue-600 pl-4 italic text-gray-600 my-4">
        {children}
      </blockquote>
    ),
    [BLOCKS.HR]: () => <hr className="my-8 border-gray-200" />,
    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      const { file, title, description } = node.data.target.fields;
      const imageUrl = file?.url ? `https:${file.url}` : "";
      const imageAlt = title || description || "Embedded image";

      if (!imageUrl) return null;

      return (
        <div className="my-6">
          <Image
            src={imageUrl}
            alt={imageAlt}
            width={file?.details?.image?.width || 800}
            height={file?.details?.image?.height || 600}
            className="rounded-lg w-full h-auto"
          />
          {description && (
            <p className="text-sm text-gray-500 mt-2 text-center">
              {description}
            </p>
          )}
        </div>
      );
    },
    [INLINES.HYPERLINK]: (node, children) => (
      <Link
        href={node.data.uri}
        className="text-blue-600 hover:underline"
        target={node.data.uri.startsWith("http") ? "_blank" : undefined}
        rel={
          node.data.uri.startsWith("http") ? "noopener noreferrer" : undefined
        }
      >
        {children}
      </Link>
    ),
  },
};

export function RichTextRenderer({ content }: RichTextRendererProps) {
  if (!content) return null;
  return (
    <div className="rich-text">
      {documentToReactComponents(content, options)}
    </div>
  );
}
