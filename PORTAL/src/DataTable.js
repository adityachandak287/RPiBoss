import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import Paper from "@material-ui/core/Paper";
import { AutoSizer, Column, Table } from "react-virtualized";

const styles = theme => ({
  flexContainer: {
    display: "flex",
    alignItems: "center",
    boxSizing: "border-box"
  },
  tableRow: {
    cursor: "pointer"
  },
  tableRowHover: {
    "&:hover": {
      backgroundColor: theme.palette.grey[200]
    }
  },
  tableCell: {
    flex: 1
  },
  noClick: {
    cursor: "initial"
  },
  header: {
    backgroundColor: "#23344e",
    color: "#fafafa"
  },
  selectedRow: {
    backgroundColor: "#a2d8f5"
  },
  links: {
    textDecoration: "none"
  }
});

class MuiVirtualizedTable extends React.PureComponent {
  static defaultProps = {
    headerHeight: 50,
    rowHeight: 50
  };
  state = {
    projectId: "",
    index: -1
  };
  getRowClassName = ({ index }) => {
    const { classes, onRowClick } = this.props;

    return clsx(classes.tableRow, classes.flexContainer, {
      [classes.tableRowHover]: index !== -1 && onRowClick != null,
      [classes.selectedRow]: this.state.index === index
    });
  };

  cellRenderer = ({ cellData, columnIndex }) => {
    const { columns, classes, rowHeight, onRowClick } = this.props;
    return (
      <TableCell
        component="div"
        className={clsx(classes.tableCell, classes.flexContainer, {
          [classes.noClick]: onRowClick == null
        })}
        variant="body"
        style={{ height: rowHeight }}
        align={
          (columnIndex != null && columns[columnIndex].numeric) || false
            ? "right"
            : "left"
        }
      >
        <span>{cellData}</span>
      </TableCell>
    );
  };

  headerRenderer = ({ label, columnIndex }) => {
    const { headerHeight, columns, classes } = this.props;

    return (
      <TableCell
        component="div"
        className={clsx(
          classes.tableCell,
          classes.flexContainer,
          classes.noClick,
          classes.header
        )}
        variant="head"
        style={{ height: headerHeight }}
        align={columns[columnIndex].numeric || false ? "right" : "left"}
      >
        <span>{label}</span>
      </TableCell>
    );
  };
  handleClick = ({ index, rowData }) => {
    console.log(rowData);
  };

  render() {
    const { classes, columns, ...tableProps } = this.props;
    return (
      <AutoSizer>
        {({ height, width }) => (
          <Table
            height={height}
            width={width}
            {...tableProps}
            rowClassName={this.getRowClassName}
            onRowClick={this.handleClick}
          >
            {columns.map(({ dataKey, ...other }, index) => {
              return (
                <Column
                  key={dataKey}
                  headerRenderer={headerProps =>
                    this.headerRenderer({
                      ...headerProps,
                      columnIndex: index
                    })
                  }
                  className={classes.flexContainer}
                  cellRenderer={this.cellRenderer}
                  dataKey={dataKey}
                  {...other}
                />
              );
            })}
          </Table>
        )}
      </AutoSizer>
    );
  }
}

const VirtualizedTable = withStyles(styles)(MuiVirtualizedTable);

class ReactVirtualizedTable extends React.Component {
  render() {
    //Pass the device list as props
    const rows = this.props.data;
    if (rows === undefined) {
      return null;
    }
    return (
      <div data-test="ProjectListComponent">
        <Paper style={{ height: 260, width: 1350, margin: 20 }} elevation={1}>
          <VirtualizedTable
            handleOpen={this.props.handleOpen}
            rowCount={rows.length}
            rowGetter={({ index }) => rows[index]}
            columns={[
              {
                width: 200,
                label: "Host IP",
                dataKey: "ip"
              },
              {
                width: 200,
                label: "Time",
                dataKey: "timestamp"
              },
              {
                width: 100,
                label: "Month",
                dataKey: "month"
              },
              {
                width: 100,
                label: "Day",
                dataKey: "day"
              },
              {
                width: 200,
                label: "FFMC",
                dataKey: "FFMC",
                numeric: true
              },
              {
                width: 200,
                label: "DMC",
                dataKey: "DMC",
                numeric: true
              },
              {
                width: 200,
                label: "DC",
                dataKey: "DC",
                numeric: true
              },
              {
                width: 200,
                label: "ISI",
                dataKey: "ISI",
                numeric: true
              },
              {
                width: 200,
                label: "Temperature(C)",
                dataKey: "temp",
                numeric: true
              },
              {
                width: 200,
                label: "Humidity(%)",
                dataKey: "RH",
                numeric: true
              },
              {
                width: 200,
                label: "Wind",
                dataKey: "wind",
                numeric: true
              },
              {
                width: 200,
                label: "Rain",
                dataKey: "rain",
                numeric: true
              },

              {
                width: 200,
                label: "Prediction",
                dataKey: "prediction",
                numeric: true
              }
            ]}
          />
        </Paper>
      </div>
    );
  }
}

ReactVirtualizedTable.propTypes = {
  devices: PropTypes.arrayOf(PropTypes.object)
};

export default ReactVirtualizedTable;
