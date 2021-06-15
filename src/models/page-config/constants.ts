const QUERY_KEY = "page-config";

const PAGE_TEMPLATE = {
  empty: "empty",
  custom: "custom",
  // 2 tables
  tables: "tables",
  // 1 image and 2 links
  imageAndLinks: "imageAndLinks",
  // 2 images and 1 link
  imagesAndLink: "imagesAndLink",
  // 1 color picker
  colorPicker: "colorPicker",
} as const;

export { PAGE_TEMPLATE, QUERY_KEY as PAGE_CONFIG_QUERY_KEY };
