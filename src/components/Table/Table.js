import React from "react";
import MUIDataTable from "mui-datatables";
import RadioTableRowAction from "./components/RadioTableRowAction";
import TableRowAction from "./components/TableRowAction";
import TableActions from "./components/TableActions";
import Empty from "../common/Empty";
// import { useTheme } from "@material-ui/core";
/**
 * Table component that will add default style and options to MUI DataTable
 * We can change the color of pagination test and icon by adding below theme to muicreateTheme
 *  MuiTablePagination:{
      root:{
        color:`${primary} !important`,
      },
      selectIcon:{
        color:`${primary} !important`,
      }
    },
 */
export default function Table({ title, data, columns, options, components }) {
  // const theme = useTheme();
  const defaultTableOptions = {
    selectableRows: false,
    elevation: 0,
    filter: false,
    download: false,
    rowHover: false,
    print: false,
    resizableColumns: false,
    setTableProps: () => {
      return {
        size: "small",
      };
    },
    textLabels: {
      body: {
        noMatch: <Empty />,
      },
    },
  };

  const defaultColumnOptions = {
    setCellProps: () => ({
      style: {
        whiteSpace: "normal",
        wordWrap: "break-word",
        fontSize: 12,
      },
    }),
    setCellHeaderProps: (value) => ({
      // style: { color: theme.palette.primary.main },
    }),
  };
  var newColumns = columns?.map((col, index) => {
    if (typeof col == "string") {
      const newCol = {
        label: col,
        options: defaultColumnOptions,
      };
      return newCol;
    } else {
      const { options, ...rest } = col;
      const newCol = {
        ...rest,
        options: {
          ...defaultColumnOptions,
          ...options,
        },
      };
      return newCol;
    }
  });

  var newOptions = {
    ...defaultTableOptions,
    ...options,
  };
  return (
    <MUIDataTable
      title={title}
      data={data}
      columns={newColumns}
      options={newOptions}
      components={components}
    />
  );
}

Table.RadioTableRowAction = RadioTableRowAction;
Table.TableRowAction = TableRowAction;
Table.TableActions = TableActions;
