import * as React from "react";

import { Field } from "models/field/types";
import { Post } from "models/post/types";

import { PageSwitcherProps } from "./types";

const PageSwitcher: React.VFC<PageSwitcherProps> = ({
  entity,
  field,
  color,
}) => {
  switch (entity) {
    case "posts": {
      const typedField = field as Field<Post>;

      switch (typedField) {
        case "title": {
          switch (color) {
            case "white": {
              return (
                <h2>
                  Specific content for `entity` "Posts", `field` "Title" and
                  `color` "White"
                </h2>
              );
            }

            default: {
              return (
                <h2>
                  Default content for `entity` "Posts" and `field` "Title"
                </h2>
              );
            }
          }
        }

        default: {
          return <h2>Default content for `entity` "Posts"</h2>;
        }
      }
    }

    default: {
      return <h2>Default content</h2>;
    }
  }
};

export { PageSwitcher };
