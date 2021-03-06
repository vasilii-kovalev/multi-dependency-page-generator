import { Layout, Menu, PageHeader, Select, Spin } from "antd";
import * as React from "react";
import { useQuery } from "react-query";

import { usePrevious } from "hooks/use-previous";
import { COLORS_QUERY_KEY } from "models/color/constants";
import { Color, ColorId } from "models/color/types";
import { ENTITIES_QUERY_KEY } from "models/entity/constants";
import { Entity, EntityId } from "models/entity/types";
import { FIELDS_QUERY_KEY } from "models/field/constants";
import { Field, FieldId } from "models/field/types";
import {
  PAGE_CONFIG_QUERY_KEY,
  PAGE_TEMPLATE,
} from "models/page-config/constants";
import { PageConfig } from "models/page-config/types";
import { getColors } from "services/color";
import { getEntities } from "services/entity";
import { getFields } from "services/field";
import { getPageConfig } from "services/page-config";
import { TemplateColorPicker } from "templates/color-picker";
import { TemplateCustom } from "templates/custom";
import { TemplateEmpty } from "templates/empty";
import { TemplateImageAndLinks } from "templates/image-and-links";
import { TemplateImagesAndLink } from "templates/images-and-link";
import { TemplateTables } from "templates/tables";

import classes from "./styles.module.scss";

const { Content, Header, Footer, Sider } = Layout;
const { Option } = Select;

const MainPage: React.VFC = () => {
  const [currentEntityId, setCurrentEntityId] = React.useState<EntityId>();
  const [currentFieldId, setCurrentField] = React.useState<FieldId>();
  const [currentColorId, setCurrentColorId] = React.useState<ColorId>();

  const { data: entities = [], isLoading: areEntitiesLoading } = useQuery(
    ENTITIES_QUERY_KEY,
    getEntities,
    {
      onSuccess: entities => {
        const [firstEntity] = entities;

        if (currentEntityId === undefined) {
          setCurrentEntityId(firstEntity.id);
        }
      },
    },
  );

  const { data: fields = [] } = useQuery(
    [FIELDS_QUERY_KEY, { entityId: currentEntityId }],
    () => getFields(currentEntityId as EntityId),
    {
      enabled: currentEntityId !== undefined,
    },
  );

  const { data: colors = [] } = useQuery(COLORS_QUERY_KEY, getColors, {
    onSuccess: colors => {
      const [firstColor] = colors;

      if (currentColorId === undefined) {
        setCurrentColorId(firstColor.id);
      }
    },
  });

  const entity = entities.find(({ id }) => id === currentEntityId);
  const field = fields.find(({ id }) => id === currentFieldId);
  const color = colors.find(({ id }) => id === currentColorId);

  const { data: pageConfig } = useQuery(
    [
      PAGE_CONFIG_QUERY_KEY,
      {
        entityId: entity?.id,
        fieldId: field?.id,
        colorId: color?.id,
      },
    ],
    () => {
      // Undefined is impossible because of `enabled` condition.
      const entityTyped = entity as Entity;
      const fieldTyped = field as Field;
      const colorTyped = color as Color;

      return getPageConfig({
        entity: entityTyped,
        field: fieldTyped,
        color: colorTyped,
      });
    },
    {
      enabled: entity !== undefined,
    },
  );

  const previousEntityId = usePrevious(currentEntityId);

  React.useEffect(() => {
    const [firstField] = fields;

    if (currentEntityId !== previousEntityId) {
      setCurrentField(undefined);
    }

    if (currentFieldId === undefined && firstField !== undefined) {
      setCurrentField(firstField.id);
    }
  }, [previousEntityId, currentEntityId, currentFieldId, fields]);

  const entitiesMenuItems = entities.map(({ name, id }) => {
    return <Menu.Item key={id}>{name}</Menu.Item>;
  });

  const colorsSelectOptions = colors.map(({ name, id }) => {
    return (
      <Option key={id} value={id}>
        {name}
      </Option>
    );
  });

  const fieldsMenuItems = fields.map(({ name, id }) => {
    return <Menu.Item key={id}>{name}</Menu.Item>;
  });

  const MainLayout: React.FC = ({ children }) => {
    return (
      <Spin spinning={areEntitiesLoading} size="large" delay={50}>
        <Layout className={classes.layout}>
          <Header>
            <Menu
              theme="dark"
              mode="horizontal"
              selectedKeys={currentEntityId ? [currentEntityId] : undefined}
              onClick={event => {
                setCurrentEntityId(event.key as EntityId);
              }}
            >
              {entitiesMenuItems}
            </Menu>
          </Header>
          {children}
          <Footer>Footer</Footer>
        </Layout>
      </Spin>
    );
  };

  let template = null;

  if (pageConfig) {
    const { template: pageTemplate } = pageConfig;

    if (pageTemplate === PAGE_TEMPLATE.custom) {
      return (
        <MainLayout>
          <Layout style={{ padding: 20, backgroundColor: "white" }}>
            <Content>
              <TemplateCustom />
            </Content>
          </Layout>
        </MainLayout>
      );
    }

    if (pageTemplate === PAGE_TEMPLATE.empty) {
      template = <TemplateEmpty />;
    } else if (pageTemplate === PAGE_TEMPLATE.tables) {
      const typedConfig = pageConfig as PageConfig<typeof PAGE_TEMPLATE.tables>;

      template = <TemplateTables pageConfig={typedConfig} />;
    } else if (pageTemplate === PAGE_TEMPLATE.imageAndLinks) {
      const typedConfig = pageConfig as PageConfig<
        typeof PAGE_TEMPLATE.imageAndLinks
      >;

      template = <TemplateImageAndLinks pageConfig={typedConfig} />;
    } else if (pageTemplate === PAGE_TEMPLATE.imagesAndLink) {
      const typedConfig = pageConfig as PageConfig<
        typeof PAGE_TEMPLATE.imagesAndLink
      >;

      template = <TemplateImagesAndLink pageConfig={typedConfig} />;
    } else if (pageTemplate === PAGE_TEMPLATE.colorPicker) {
      const typedConfig = pageConfig as PageConfig<
        typeof PAGE_TEMPLATE.colorPicker
      >;

      template = <TemplateColorPicker pageConfig={typedConfig} />;
    }
  }

  return (
    <MainLayout>
      <Layout>
        <Sider width={200} theme="dark">
          <Menu
            theme="dark"
            mode="inline"
            style={{ height: "100%", borderRight: 0 }}
            selectedKeys={currentFieldId ? [currentFieldId] : undefined}
            onClick={event => {
              setCurrentField(event.key as FieldId);
            }}
          >
            {fieldsMenuItems}
          </Menu>
        </Sider>

        <Layout>
          <PageHeader style={{ borderBottom: "2px solid #001529" }}>
            <Select<ColorId>
              value={currentColorId}
              style={{ width: 120 }}
              onChange={color => {
                setCurrentColorId(color);
              }}
            >
              {colorsSelectOptions}
            </Select>
          </PageHeader>

          <Layout style={{ padding: 20, backgroundColor: "white" }}>
            <Content>{template}</Content>
          </Layout>
        </Layout>
      </Layout>
    </MainLayout>
  );
};

export { MainPage };
