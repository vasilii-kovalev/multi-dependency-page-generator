import { Layout, Menu, Select } from "antd";
import * as React from "react";
import { useQuery } from "react-query";

import { usePageConfig } from "hooks/use-page-config";
import { usePrevious } from "hooks/use-previous";
import { COLORS_QUERY_KEY } from "models/color/constants";
import { ColorId } from "models/color/types";
import { Entity, EntityId } from "models/entity/types";
import { FIELDS_QUERY_KEY } from "models/field/constants";
import { FieldId } from "models/field/types";
import { getColors } from "services/color";
import { getFields } from "services/field";

interface Props {
  currentEntityId: EntityId | undefined;
  entity: Entity | undefined;
}

const { Content, Sider } = Layout;
const { Option } = Select;

const TemplateDefault: React.VFC<Props> = ({ currentEntityId, entity }) => {
  const [currentFieldId, setCurrentField] = React.useState<FieldId>();
  const [currentColorId, setCurrentColorId] = React.useState<ColorId>();

  const previousEntityId = usePrevious(currentEntityId);

  const { data: fields = [], isLoading: areFieldsLoading } = useQuery(
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

  const field = fields.find(({ id }) => id === currentFieldId);
  const color = colors.find(({ id }) => id === currentColorId);

  const { data: pageConfig } = usePageConfig({
    entity,
    field,
    color,
    enabled: entity !== undefined && field !== undefined && color !== undefined,
  });

  React.useEffect(() => {
    const [firstField] = fields;

    if (currentEntityId !== previousEntityId) {
      setCurrentField(undefined);
    }

    if (currentFieldId === undefined && firstField !== undefined) {
      setCurrentField(firstField.id);
    }
  }, [previousEntityId, currentEntityId, currentFieldId, fields]);

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
    <Layout>
      <Sider width={200} theme="light">
        <Menu
          theme="light"
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
      </Content>
    </Layout>
  );
};

export { TemplateDefault };
