import { Space, Table } from "antd";
import { ColumnType } from "antd/lib/table";
import * as React from "react";

import { PAGE_TEMPLATE } from "models/page-config/constants";
import { PageConfig, TableParams } from "models/page-config/types";
import { useQuery } from "react-query";
import { TABLE_QUERY_KEY } from "models/table/constants";
import { getTableData } from "services/table";

interface TableComponentProps {
  params: TableParams;
}

const TableComponent: React.VFC<TableComponentProps> = ({ params }) => {
  const { id: tableId, columns } = params;

  const { data: tableData, isLoading: isTableDataLoading } = useQuery(
    [TABLE_QUERY_KEY, tableId],
    () => getTableData(tableId),
  );

  const columnsAdjusted = columns.map(({ id, name }) => {
    const column: ColumnType<any> = {
      dataIndex: id,
      title: name,
    };

    return column;
  });

  return (
    <Table
      key={tableId}
      bordered={true}
      columns={columnsAdjusted}
      dataSource={tableData}
      loading={isTableDataLoading}
      pagination={false}
    />
  );
};

interface Props {
  pageConfig: PageConfig<typeof PAGE_TEMPLATE.default>;
}

const TemplateDefault: React.VFC<Props> = ({ pageConfig }) => {
  const {
    params: { tables },
  } = pageConfig;

  const tableComponents = tables.map(tableParams => {
    return <TableComponent params={tableParams} />;
  });

  return (
    <>
      <h2>Default template</h2>

      <Space direction="vertical" size={32} style={{ width: "100%" }}>
        {tableComponents}
      </Space>
    </>
  );
};

export { TemplateDefault };
