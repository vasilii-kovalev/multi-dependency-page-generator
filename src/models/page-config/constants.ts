const QUERY_KEY = "page-config";

const PAGE_TEMPLATE = {
  // 2 tables
  default: "default",
  // 1 picture and 2 links
  usersDefault: "usersDefault",
  // 1 link
  link: "link",
  // 1 color picker
  colorPicker: "colorPicker",
  custom: "custom",
} as const;

const TABLE_PERMISSION = {
  read: "read",
  write: "write",
} as const;

export { QUERY_KEY as PAGE_CONFIG_QUERY_KEY, PAGE_TEMPLATE, TABLE_PERMISSION };
