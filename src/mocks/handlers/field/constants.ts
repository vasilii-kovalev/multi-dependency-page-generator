const FIELD_ID = {
  address: "address",
  body: "body",
  company: "company",
  email: "email",
  id: "id",
  name: "name",
  phone: "phone",
  title: "title",
  userId: "userId",
  username: "username",
  website: "website",
} as const;

const FIELD_GROUP = {
  custom: "custom",
  default: "default",
} as const;

export { FIELD_ID, FIELD_GROUP };
