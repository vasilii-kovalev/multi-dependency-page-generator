import * as React from "react";

import { PAGE_TEMPLATE } from "models/page-config/constants";
import { PageConfig } from "models/page-config/types";

interface TemplateProps {
  pageConfig: PageConfig<typeof PAGE_TEMPLATE.imagesAndLink>;
}

const TemplateImagesAndLink: React.VFC<TemplateProps> = ({ pageConfig }) => {
  const {
    params: {
      images,
      link: { url: linkUrl, text: linkText },
    },
  } = pageConfig;
  const imageComponents = images.map(({ url, description }) => {
    return <img key={description} src={url} alt={description} height={300} />;
  });

  return (
    <>
      <h2>Images and link template</h2>

      {imageComponents}

      <p>
        <a href={linkUrl}>{linkText}</a>
      </p>
    </>
  );
};

export { TemplateImagesAndLink };
