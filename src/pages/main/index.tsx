import { Layout, Menu, Spin } from "antd";
import * as React from "react";
import { useQuery } from "react-query";

import { usePageConfig } from "hooks/use-page-config";
import { ENTITIES_QUERY_KEY } from "models/entity/constants";
import { EntityId } from "models/entity/types";
import { PAGE_TEMPLATE } from "models/page-config/constants";
import { getEntities } from "services/entity";
import { TemplateDefault } from "templates/default";

import classes from "./styles.module.css";

const { Content, Header, Footer } = Layout;

const MainPage: React.VFC = () => {
  const [currentEntityId, setCurrentEntityId] = React.useState<EntityId>();

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

  const entity = entities.find(({ id }) => id === currentEntityId);

  const { data: pageConfig } = usePageConfig({
    entity,
    enabled: entity !== undefined,
  });

  let template = (
    <Layout>
      <Content></Content>
    </Layout>
  );

  if (pageConfig) {
    const { template: pageTemplate } = pageConfig;

    if (pageTemplate === PAGE_TEMPLATE.default) {
      template = (
        <TemplateDefault currentEntityId={currentEntityId} entity={entity} />
      );
    }
  }

  const entitiesMenuItems = entities.map(({ name, id }) => {
    return <Menu.Item key={id}>{name}</Menu.Item>;
  });

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

        {template}
        <Footer>Footer</Footer>
      </Layout>
    </Spin>
  );
};

export { MainPage };
