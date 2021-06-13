import { Layout, Menu, Select, Spin } from "antd";
import * as React from "react";
import { useQuery } from "react-query";

import { ENTITIES_QUERY_KEY } from "models/entity/constants";
import { Entity } from "models/entity/types";
import { FIELDS_QUERY_KEY } from "models/field/constants";
import { Field } from "models/field/types";
import { getEntities } from "services/entity";
import { getFields } from "services/field";

import classes from "./styles.module.css";

const { Header, Footer, Sider, Content } = Layout;
const { Option } = Select;

const MainPage: React.VFC = () => {
  const page = <section>Page</section>;

  const [currentEntity, setCurrentEntity] = React.useState<Entity | "">("");
  const [currentField, setCurrentField] = React.useState<Field | "">("");
  const { data: entities = [], isLoading: areEntitiesLoading } = useQuery(
    ENTITIES_QUERY_KEY,
    getEntities,
    {
      onSuccess: entities => {
        if (!currentEntity) {
          setCurrentEntity(entities[0]);
        }
      },
    },
  );

  const { data: fields = [], isLoading: areFieldsLoading } = useQuery(
    [FIELDS_QUERY_KEY, currentEntity],
    () => getFields(currentEntity as Entity),
    {
      enabled: !!currentEntity,
      onSuccess: fields => {
        if (!currentField) {
          setCurrentField(fields[0]);
        }
      },
    },
  );

  const entitiesMenuItems = entities.map(entity => {
    return <Menu.Item key={entity}>{entity}</Menu.Item>;
  });

  const fieldsMenuItems = fields.map(field => {
    return <Menu.Item key={field}>{field}</Menu.Item>;
  });

  return (
    <Spin
      spinning={areEntitiesLoading || areFieldsLoading}
      size="large"
      delay={50}
    >
      <Layout className={classes.layout}>
        <Header>
          <Menu
            theme="dark"
            mode="horizontal"
            selectedKeys={[currentEntity]}
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
              selectedKeys={[currentField]}
              onClick={event => {
                setCurrentField(event.key as Field);
              }}
            >
              {fieldsMenuItems}
            </Menu>
          </Sider>

          <Content>
            <Select defaultValue="lucy" style={{ width: 120 }}>
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="disabled" disabled>
                Disabled
              </Option>
              <Option value="Yiminghe">yiminghe</Option>
            </Select>

            <Select defaultValue="lucy" style={{ width: 120 }}>
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="disabled" disabled>
                Disabled
              </Option>
              <Option value="Yiminghe">yiminghe</Option>
            </Select>

            <Select defaultValue="lucy" style={{ width: 120 }}>
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="disabled" disabled>
                Disabled
              </Option>
              <Option value="Yiminghe">yiminghe</Option>
            </Select>

            {page}
          </Content>
        </Layout>
        <Footer>Footer</Footer>
      </Layout>
    </Spin>
  );
};

export { MainPage };
