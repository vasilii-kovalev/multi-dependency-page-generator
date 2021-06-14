import * as React from "react";

import { PAGE_TEMPLATE } from "models/page-config/constants";
import { PageConfig } from "models/page-config/types";

interface Props {
  pageConfig: PageConfig<typeof PAGE_TEMPLATE.usersDefault>;
}

const TemplateUsersDefault: React.VFC<Props> = ({ pageConfig }) => {
  const {
    params: {
      image: { url: imageUrl, description: imageDescription },
      links,
    },
  } = pageConfig;
  const linkComponents = links.map(({ url, text }) => {
    return (
      <li key={text}>
        <a href={url}>{text}</a>
      </li>
    );
  });

  return (
    <>
      <h2>Users default template</h2>

      <img src={imageUrl} alt={imageDescription} height={300} />

      <ul>{linkComponents}</ul>
    </>
  );
};

export { TemplateUsersDefault };
