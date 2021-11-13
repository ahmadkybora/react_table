import React from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";

class BSTable extends React.Component {
  componentWillMount() {
    console.log("eeee", this.props);
  }

  columnClassNameFormat = (fieldValue, row, rowIdx, colIdx) => {
    console.log(fieldValue, row, rowIdx, colIdx);
    // fieldValue is column value
    // row is whole row object
    // rowIdx is index of row
    // colIdx is index of column
    return rowIdx % 2 === 0
      ? "td-column-function-even-example"
      : "td-column-function-odd-example";
  };
  render() {
    if (this.props.data) {
      return (
        <BootstrapTable data={this.props.data}>
          <TableHeaderColumn dataField="id" isKey>
            Col A
          </TableHeaderColumn>
          <TableHeaderColumn dataField="value1">Col B</TableHeaderColumn>
          <TableHeaderColumn
            dataField="value2"
            columnClassName={this.columnClassNameFormat()}
          >
            Col C
          </TableHeaderColumn>
        </BootstrapTable>
      );
    } else {
      return <p>?</p>;
    }
  }
}

export default class Table extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [
        { id: 0, value1: 432, value2: 984 },
        { id: 1, value1: 432, value2: 984 },
        { id: 2, value1: 432, value2: 984 },
        { id: 3, value1: 432, value2: 984 },
        { id: 4, value1: 432, value2: 984 },
        { id: 5, value1: 432, value2: 984 },
        { id: 6, value1: 432, value2: 984 },
        { id: 7, value1: 432, value2: 984 },
        { id: 8, value1: 432, value2: 984 }
      ]
    };

    this.expandComponent = this.expandComponent.bind(this);
    this.handleExpand = this.handleExpand.bind(this);

    this.expandedRows = {};
  }

  expandComponent(row) {
    //console.log(row, this.expandedRows);
    if (this.expandedRows[row.id]) {
      if (this.count) {
        this.count.innerText = +this.count.innerText + 1;
      }

      return (
        <div>
          FETCH STUFF HERE
          <BSTable data={this.state.data} />
        </div>
      );
    }
  }

  handleExpand(rowKey, isExpand) {
    this.expandedRows[rowKey] = isExpand;
  }

  render() {
    const tableOptions = {
      expandRowBgColor: "#f9f9fc",
      expandBy: "column",
      onExpand: this.handleExpand
    };

    const expandColumnOptions = {
      expandColumnVisible: true
    };

    return (
      <div>
        <h2>
          Fetched:{" "}
          <span
            ref={count => {
              this.count = count;
            }}
          >
            0
          </span>
        </h2>
        <BootstrapTable
          options={tableOptions}
          data={this.state.data}
          expandableRow={() => true}
          expandComponent={this.expandComponent}
          expandColumnOptions={expandColumnOptions}
        >
          <TableHeaderColumn dataField="id" isKey>
            Col 1
          </TableHeaderColumn>
          <TableHeaderColumn dataField="value1">Col 2</TableHeaderColumn>
          <TableHeaderColumn dataField="value2">Col 3</TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}
