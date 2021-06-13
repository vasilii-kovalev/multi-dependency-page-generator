import { Layout, Menu, Select, Spin } from "antd";
import * as React from "react";
import { useQuery } from "react-query";

import { usePrevious } from "hooks/usePrevious";
import { COLORS_QUERY_KEY } from "models/color/constants";
import { Color } from "models/color/types";
import { ENTITIES_QUERY_KEY } from "models/entity/constants";
import { Entity } from "models/entity/types";
import { FIELDS_QUERY_KEY } from "models/field/constants";
import { Field } from "models/field/types";
import { getColors } from "services/color";
import { getEntities } from "services/entity";
import { getFields } from "services/field";

import classes from "./styles.module.css";
import { PageSwitcher } from "./switcher";

const { Header, Footer, Sider, Content } = Layout;
const { Option } = Select;

const MainPage: React.VFC = () => {
  const [currentEntity, setCurrentEntity] = React.useState<Entity>();
  const [currentColor, setCurrentColor] = React.useState<Color>();
  const [currentField, setCurrentField] = React.useState<Field>();
  const previousEntity = usePrevious(currentEntity);

  const { data: entities = [], isLoading: areEntitiesLoading } = useQuery(
    ENTITIES_QUERY_KEY,
    getEntities,
    {
      onSuccess: entities => {
        const [firstEntity] = entities;
        if (!currentEntity) {
          setCurrentEntity(firstEntity);
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
        if (!currentColor) {
          setCurrentColor(firstColor);
        }
      },
    },
  );

  const { data: fields = [], isLoading: areFieldsLoading } = useQuery(
    [FIELDS_QUERY_KEY, currentEntity],
    () => getFields(currentEntity as Entity),
    {
      enabled: !!currentEntity,
    },
  );

  React.useEffect(() => {
    const [firstField] = fields;

    if (!currentField || currentEntity !== previousEntity) {
      setCurrentField(firstField);
    }
  }, [previousEntity, currentEntity, currentField, fields]);

  const entitiesMenuItems = entities.map(entity => {
    return <Menu.Item key={entity}>{entity}</Menu.Item>;
  });

  const colorsSelectOptions = colors.map(color => {
    return (
      <Option key={color} value={color}>
        {color}
      </Option>
    );
  });

  const fieldsMenuItems = fields.map(field => {
    return <Menu.Item key={field}>{field}</Menu.Item>;
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
            selectedKeys={currentEntity && [currentEntity]}
            onClick={event => {
              setCurrentEntity(event.key as Entity);
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
              selectedKeys={currentField && [currentField]}
              onClick={event => {
                setCurrentField(event.key as Field);
              }}
            >
              {fieldsMenuItems}
            </Menu>
          </Sider>

          <Content>
            <Select
              value={currentColor}
              style={{ width: 120 }}
              onChange={color => {
                setCurrentColor(color);
              }}
            >
              {colorsSelectOptions}
            </Select>

            <PageSwitcher
              entity={currentEntity}
              field={currentField}
              color={currentColor}
            />
          </Content>
        </Layout>
        <Footer>Footer</Footer>
      </Layout>
    </Spin>
  );
};

export { MainPage };
