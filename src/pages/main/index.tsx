import { Layout, Menu, Select, Spin } from "antd";
import * as React from "react";
import { useQuery } from "react-query";

import { usePrevious } from "hooks/use-previous";
import { COLORS_QUERY_KEY } from "models/color/constants";
import { ColorId } from "models/color/types";
import { ENTITIES_QUERY_KEY } from "models/entity/constants";
import { EntityId } from "models/entity/types";
import { FIELDS_QUERY_KEY } from "models/field/constants";
import { FieldId } from "models/field/types";
import { getColors } from "services/color";
import { getEntities } from "services/entity";
import { getFields } from "services/field";

import classes from "./styles.module.css";
import { PageSwitcher } from "./switcher";

const { Header, Footer, Sider, Content } = Layout;
const { Option } = Select;

const MainPage: React.VFC = () => {
  const [currentEntityId, setCurrentEntityId] = React.useState<EntityId>();
  const [currentColorId, setCurrentColorId] = React.useState<ColorId>();
  const [currentFieldId, setCurrentField] = React.useState<FieldId>();
  const previousEntityId = usePrevious(currentEntityId);

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

  const { data: colors = [], isLoading: areColorsLoading } = useQuery(
    COLORS_QUERY_KEY,
    getColors,
    {
      onSuccess: colors => {
        const [firstColor] = colors;

        if (currentColorId === undefined) {
          setCurrentColorId(firstColor.id);
        }
      },
    },
  );

  const { data: fields = [], isLoading: areFieldsLoading } = useQuery(
    [FIELDS_QUERY_KEY, currentEntityId],
    () => getFields(currentEntityId as EntityId),
    {
      enabled: Boolean(currentEntityId),
    },
  );

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

  return (
    <Spin
      spinning={areEntitiesLoading || areColorsLoading || areFieldsLoading}
      size="large"
      delay={50}
    >
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

        <Layout>
          <Sider width={200}>
            <Menu
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

          <Content>
            <Select<ColorId>
              value={currentColorId}
              style={{ width: 120 }}
              onChange={color => {
                setCurrentColorId(color);
              }}
            >
              {colorsSelectOptions}
            </Select>

            <PageSwitcher
              entity={entities.find(({ id }) => id === currentEntityId)}
              field={fields.find(({ id }) => id === currentFieldId)}
              color={colors.find(({ id }) => id === currentColorId)}
            />
          </Content>
        </Layout>
        <Footer>Footer</Footer>
      </Layout>
    </Spin>
  );
};

export { MainPage };
