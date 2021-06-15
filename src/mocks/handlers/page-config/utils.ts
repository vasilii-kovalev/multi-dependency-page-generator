import { ResponseComposition, RestContext } from "msw";

import { DEFAULT_DELAY } from "mocks/constants";

import { COLOR_ID } from "../colors/constants";
import { Color } from "../colors/types";
import { ENTITY_ID } from "../entity/constants";
import { Entity } from "../entity/types";
import { FIELD_ID } from "../field/constants";
import { Field } from "../field/types";
import { TABLE_ID, TABLE_PERMISSION } from "../table/constants";
import { PAGE_TEMPLATE } from "./constants";
import { PageConfig } from "./types";

const isEntityValid = (entity: Entity | undefined): entity is Entity =>
  Object.values(ENTITY_ID).includes(entity?.id as Entity["id"]);

const isFieldValid = (field: Field | undefined): field is Field =>
  Object.values(FIELD_ID).includes(field?.id as Field["id"]);

const isColorValid = (color: Color | undefined): color is Color =>
  Object.values(COLOR_ID).includes(color?.id as Color["id"]);

interface HandleEntityFieldAndColorParams {
  response: ResponseComposition;
  context: RestContext;
  entity: Entity;
  field: Field | undefined;
  color: Color | undefined;
}

const handleEntityFieldAndColor = ({
  response,
  context,
  entity,
  field,
  color,
}: HandleEntityFieldAndColorParams) => {
  if (field !== undefined && color !== undefined) {
    const { id: entityId } = entity;
    const { id: fieldId } = field;
    const { id: colorId } = color;

    if (
      entityId === ENTITY_ID.users &&
      fieldId === FIELD_ID.company &&
      colorId === COLOR_ID.blue
    ) {
      const pageConfig: PageConfig<typeof PAGE_TEMPLATE.colorPicker> = {
        template: PAGE_TEMPLATE.colorPicker,
        params: {
          color: "#0000ff",
        },
      };

      return response(
        context.status(200),
        context.delay(DEFAULT_DELAY),
        context.json(pageConfig),
      );
    }
  }

  return null;
};

interface HandleEntityAndFieldParams {
  response: ResponseComposition;
  context: RestContext;
  entity: Entity;
  field: Field | undefined;
}

const handleEntityAndField = ({
  response,
  context,
  entity,
  field,
}: HandleEntityAndFieldParams) => {
  if (field !== undefined) {
    const { id: entityId } = entity;
    const { id: fieldId } = field;

    if (entityId === ENTITY_ID.posts) {
      if (fieldId === FIELD_ID.userId) {
        const pageConfig: PageConfig<typeof PAGE_TEMPLATE.tables> = {
          template: PAGE_TEMPLATE.tables,
          params: {
            tables: [
              {
                id: TABLE_ID.table1,
                columns: [
                  {
                    id: "id",
                    name: "Id",
                  },
                  {
                    id: "name",
                    name: "Name",
                  },
                ],
                permissions: [TABLE_PERMISSION.read],
              },
              {
                id: TABLE_ID.table2,
                columns: [
                  {
                    id: "username",
                    name: "Username",
                  },
                  {
                    id: "email",
                    name: "Email",
                  },
                ],
                permissions: [TABLE_PERMISSION.read],
              },
            ],
          },
        };

        return response(
          context.status(200),
          context.delay(DEFAULT_DELAY),
          context.json(pageConfig),
        );
      }

      if (fieldId === FIELD_ID.id) {
        const pageConfig: PageConfig<typeof PAGE_TEMPLATE.tables> = {
          template: PAGE_TEMPLATE.tables,
          params: {
            tables: [
              {
                id: TABLE_ID.table3,
                columns: [
                  {
                    id: "phone",
                    name: "Phone",
                  },
                  {
                    id: "website",
                    name: "Website",
                  },
                ],
                permissions: [TABLE_PERMISSION.read],
              },
              {
                id: TABLE_ID.table4,
                columns: [
                  {
                    id: "companyName",
                    name: "Company Name",
                  },
                  {
                    id: "addressStreet",
                    name: "Address Street",
                  },
                ],
                permissions: [TABLE_PERMISSION.read],
              },
            ],
          },
        };

        return response(
          context.status(200),
          context.delay(DEFAULT_DELAY),
          context.json(pageConfig),
        );
      }

      if (fieldId === FIELD_ID.body) {
        const pageConfig: PageConfig<typeof PAGE_TEMPLATE.imagesAndLink> = {
          template: PAGE_TEMPLATE.imagesAndLink,
          params: {
            images: [
              {
                url: "https://rus11.files.wordpress.com/2017/02/prdkshn.png",
                description: "That's fine",
              },
              {
                url: "https://pbs.twimg.com/media/ErTXkrEWMAQ6GJo.jpg",
                description: "Software development joke",
              },
            ],
            link: {
              url: "https://whocanuse.com/",
              text: "WhoCanUse",
            },
          },
        };

        return response(
          context.status(200),
          context.delay(DEFAULT_DELAY),
          context.json(pageConfig),
        );
      }
    }
  }

  return null;
};

interface HandleEntityOnlyParams {
  response: ResponseComposition;
  context: RestContext;
  entity: Entity;
}

const handleEntityOnly = ({
  response,
  context,
  entity,
}: HandleEntityOnlyParams) => {
  const { id: entityId } = entity;

  if (entityId === ENTITY_ID.posts) {
    const pageConfig: PageConfig<typeof PAGE_TEMPLATE.empty> = {
      template: PAGE_TEMPLATE.empty,
    };

    return response(
      context.status(200),
      context.delay(DEFAULT_DELAY),
      context.json(pageConfig),
    );
  }

  if (entityId === ENTITY_ID.users) {
    const pageConfig: PageConfig<typeof PAGE_TEMPLATE.imageAndLinks> = {
      template: PAGE_TEMPLATE.imageAndLinks,
      params: {
        image: {
          url: "https://telegra.ph/file/c1bde7af4a7c021fc5d87.jpg",
          description: "A suffering cat",
        },
        links: [
          {
            url: "https://jsonplaceholder.typicode.com/",
            text: "JSONPlaceholder",
          },
          { url: "https://pokeapi.co/", text: "PokéAPI" },
        ],
      },
    };

    return response(
      context.status(200),
      context.delay(DEFAULT_DELAY),
      context.json(pageConfig),
    );
  }

  if (entityId === ENTITY_ID.variables) {
    const pageConfig: PageConfig<typeof PAGE_TEMPLATE.custom> = {
      template: PAGE_TEMPLATE.custom,
    };

    return response(
      context.status(200),
      context.delay(DEFAULT_DELAY),
      context.json(pageConfig),
    );
  }

  return null;
};

export {
  handleEntityAndField,
  handleEntityFieldAndColor,
  handleEntityOnly,
  isColorValid,
  isEntityValid,
  isFieldValid,
};
