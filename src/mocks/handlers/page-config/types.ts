import { PAGE_TEMPLATE } from "models/page-config/constants";
import { TableColumns, TablePermissions } from "models/table/types";
import { Values } from "types/utils";

import { ColorRaw } from "../colors/types";
import { EntityRaw } from "../entity/types";
import { FieldRaw } from "../field/types";
import { TableId } from "../table/types";

type PageTemplate = Values<typeof PAGE_TEMPLATE>;

interface TableParams {
  // For data and columns fetching.
  id: TableId;
  columns: TableColumns;
  permissions: TablePermissions;
}

interface TemplateTablesParams {
  tables: [TableParams, TableParams];
}

interface Image {
  url: string;
  description: string;
}

interface Link {
  url: string;
  text: string;
}

interface TemplateImageAndLinksParams {
  image: Image;
  links: [Link, Link];
}

interface TemplateImagesAndLinkParams {
  images: [Image, Image];
  link: Link;
}

interface TemplateColorPickerParams {
  color: string;
}

type TemplateParams<Template extends PageTemplate = PageTemplate> =
  Template extends typeof PAGE_TEMPLATE.imageAndLinks
    ? TemplateImageAndLinksParams
    : Template extends typeof PAGE_TEMPLATE.imagesAndLink
    ? TemplateImagesAndLinkParams
    : Template extends typeof PAGE_TEMPLATE.colorPicker
    ? TemplateColorPickerParams
    : TemplateTablesParams;

interface PageConfigWithoutParams<
  Template extends PageTemplate = PageTemplate,
> {
  template: Template;
}

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

export type { PageConfig };

interface RequestBody {
  /*
    Fields are marked as "optional" to create correct validation and thus avoid
    internal server errors.
  */
  entity?: EntityRaw;
  field?: FieldRaw;
  color?: ColorRaw;
}

export type { RequestBody };
