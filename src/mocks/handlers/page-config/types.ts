import { PAGE_TEMPLATE } from "models/page-config/constants";
import {
  Image,
  Link,
  PageConfigWithoutParams,
  PageTemplate,
  TemplateColorPickerParams,
} from "models/page-config/types";

import { Color } from "../colors/types";
import { Entity } from "../entity/types";
import { Field } from "../field/types";
import { TableColumns, TableId, TablePermissions } from "../table/types";

interface TableParams {
  // For data and columns fetching.
  id: TableId;
  columns: TableColumns;
  permissions: TablePermissions;
}

interface TemplateTablesParams {
  tables: [TableParams, TableParams];
}

interface TemplateImageAndLinksParams {
  image: Image;
  links: [Link, Link];
}

interface TemplateImagesAndLinkParams {
  images: [Image, Image];
  link: Link;
}

type TemplateParams<Template extends PageTemplate = PageTemplate> =
  Template extends typeof PAGE_TEMPLATE.imageAndLinks
    ? TemplateImageAndLinksParams
    : Template extends typeof PAGE_TEMPLATE.imagesAndLink
    ? TemplateImagesAndLinkParams
    : Template extends typeof PAGE_TEMPLATE.colorPicker
    ? TemplateColorPickerParams
    : TemplateTablesParams;

interface PageConfigWithParams<Template extends PageTemplate = PageTemplate>
  extends PageConfigWithoutParams<Template> {
  params: TemplateParams<Template>;
}

type PageConfig<Template extends PageTemplate = PageTemplate> =
  Template extends typeof PAGE_TEMPLATE.empty
    ? PageConfigWithoutParams<Template>
    : Template extends typeof PAGE_TEMPLATE.custom
    ? PageConfigWithoutParams<Template>
    : PageConfigWithParams<Template>;

interface RequestBody {
  /*
    Fields are marked as "optional" to create correct validation and thus avoid
    internal server errors.
  */
  entity?: Entity;
  field?: Field;
  color?: Color;
}

export type { PageConfig, RequestBody };
