const QUERY_KEY = "table";

const TABLE_PERMISSION = {
  read: "read",
  write: "write",
} as const;

export { TABLE_PERMISSION, QUERY_KEY as TABLE_QUERY_KEY };
