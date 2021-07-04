import { Space, Table } from "antd";
import { ColumnType } from "antd/lib/table";
import * as React from "react";
import { useQuery } from "react-query";

import { PAGE_TEMPLATE } from "models/page-config/constants";
import { PageConfig, TableParams } from "models/page-config/types";
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const column: ColumnType<any> = {
      dataIndex: id,
      title: name,
      width: "50%",
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
      rowKey={columns[0].id}
    />
  );
};

interface TemplateProps {
  pageConfig: PageConfig<typeof PAGE_TEMPLATE.tables>;
}

const TemplateTables: React.VFC<TemplateProps> = ({ pageConfig }) => {
  const {
    params: { tables },
  } = pageConfig;

  const tableComponents = tables.map(tableParams => {
    return <TableComponent key={tableParams.id} params={tableParams} />;
  });

  return (
    <>
      <h2>Tables template</h2>

      <Space direction="vertical" size={32} style={{ width: "100%" }}>
        {tableComponents}
      </Space>
    </>
  );
};

export { TemplateTables };
