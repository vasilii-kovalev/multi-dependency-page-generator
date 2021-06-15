import { TableColumns, TableId, TablePermissions } from "models/table/types";
import { Values } from "types/utils";

import { PAGE_TEMPLATE } from "./constants";

type PageTemplate = Values<typeof PAGE_TEMPLATE>;

interface TableParams {
  // For data and columns fetching.
  id: TableId;
  columns: TableColumns;
  permissions: TablePermissions;
}

interface TemplateDefaultParams {
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

interface TemplateUsersDefaultParams {
  image: Image;
  links: [Link, Link];
}

interface TemplateLinkParams {
  images: [Image, Image];
  link: Link;
}

interface TemplateColorPickerParams {
  color: string;
}

type TemplateParams<Template extends PageTemplate = PageTemplate> =
  Template extends typeof PAGE_TEMPLATE.usersDefault
    ? TemplateUsersDefaultParams
    : Template extends typeof PAGE_TEMPLATE.link
    ? TemplateLinkParams
    : Template extends typeof PAGE_TEMPLATE.colorPicker
    ? TemplateColorPickerParams
    : TemplateDefaultParams;

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
  Template extends typeof PAGE_TEMPLATE.custom
    ? PageConfigWithoutParams<Template>
    : PageConfigWithParams<Template>;

export type { PageConfig, TableParams };
