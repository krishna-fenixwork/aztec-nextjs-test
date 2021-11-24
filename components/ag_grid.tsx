import {AgGridColumn, AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

const CustomAGGrid = ({
    quarterReportData, tableHeight, rowStyle, getRowStyle, onGridReady, selected, setSelected
}) => {

    // const headerHeightGetter = () => {
    //     const columnHeaderTexts = [
    //         ...document.querySelectorAll('.ag-header-cell-text')
    //     ];
    //     const clientHeights = columnHeaderTexts.map(
    //         headerText => headerText.clientHeight
    //     );
    //     const tallestHeaderTextHeight = Math.max(...clientHeights);
    //     return tallestHeaderTextHeight;
    // }
    // function headerHeightSetter() {
    //     const padding = 20;
    //     const height = headerHeightGetter() + padding;
    //     this.api.setHeaderHeight(height);
    //     this.api.resetRowHeights();
    // }

    return (
        <div className = 'full-width table-container' style={tableHeight}>
            <div className='ag-theme-alpine Back full-width' style={{height: '100vh'}}>
                <AgGridReact
                    defaultColDef={{
                        flex: 1,
                        sortable: true,
                        minWidth: 100,
                        filter: true,
                        resizable: true
                    }}
                    sideBar={{
                        toolPanels: ['columns', 'filters'],
                        defaultToolPanel: ''
                    }}
                    rowStyle={rowStyle}
                    getRowStyle={getRowStyle}
                    rowData={quarterReportData}
                    rowSelection='multiple'
                    suppressRowClickSelection={true}
                    components={{
                        rowNodeIdRenderer: function (params) {
                            return params.node.id + 1;
                        }
                    }}
                    pagination={true}
                    paginationPageSize={500}
                    customChartThemes={{
                        myCustomTheme: {
                            overrides: {
                                common: {
                                    background: { fill: '#090a0d' },
                                    legend: {
                                        item: {
                                            label: {
                                                color: '#fff'
                                            }
                                        }
                                    }
                                },
                                cartesian: {
                                    axes: {
                                        number: {
                                            gridStyle: [
                                                {
                                                    stroke: '#80808044',
                                                    lineDash: [6, 3]
                                                }
                                            ]
                                        },
                                        category: {
                                            gridStyle: [
                                                {
                                                    stroke: '#80808044',
                                                    lineDash: [6, 3]
                                                }
                                            ]
                                        }
                                    }
                                }
                            }
                        }
                    }}
                    chartThemes={['myCustomTheme', 'ag-pastel', 'ag-vivid']}
                    onGridReady={onGridReady}
                    enableCharts={true}
                    enableRangeSelection={true}
                    rowDragManaged={true}
                    animateRows={true}
                    // onFirstDataRendered={headerHeightSetter}
                    >
                    <AgGridColumn
                        field='fundName'
                        headerName='Fund Name'
                        minWidth={150}
                        flex={1}
                        enablePivot={true}
                        enableValue={true}
                        enableRowGroup={true}/>
                    <AgGridColumn
                        field='dataAsOfQuarter'
                        headerName='Data as of Quarter'
                        width={120}
                        flex={0}
                        enablePivot={true}
                        enableRowGroup={true}
                    />
                    <AgGridColumn
                        field='grossIRR'
                        headerName='Gross IRR'                        
                        filter='agNumberColumnFilter'
                        width={120}
                        flex={0}
                        enablePivot={true}
                        enableRowGroup={true}
                        enableValue={true}
                        columnGroupShow='open'
                    />
                    <AgGridColumn
                        field='netIRR'
                        headerName='Net IRR'                        
                        filter='agNumberColumnFilter'
                        width={100}
                        flex={0}
                        enablePivot={true}
                        enableRowGroup={true}
                        enableValue={true}
                        columnGroupShow='open'
                    />
                    <AgGridColumn
                        field='grossMOIC'
                        headerName='Gross MOIC'
                        filter='agNumberColumnFilter'                        
                        width={120}
                        flex={0}
                        enablePivot={true}
                        enableRowGroup={true}
                        enableValue={true}
                        columnGroupShow='open'
                    />
                    <AgGridColumn
                        field='netMOIC'
                        headerName='Net MOIC'
                        filter='agNumberColumnFilter'                        
                        width={100}
                        flex={0}
                        enableValue={true}
                        enablePivot={true}
                        columnGroupShow='open'
                        enableRowGroup={true}
                    />
                    <AgGridColumn
                        field='NAV'
                        headerName='NAV'                       
                        filter='agNumberColumnFilter'
                        width={120}
                        flex={0}
                        enablePivot={true}
                        enableValue={true}
                        columnGroupShow='open'
                        enableRowGroup={true}
                    />
                    <AgGridColumn
                        field='distributionsCapitalDPI'
                        headerName='DPI'                                               
                        filter='agNumberColumnFilter'
                        width={150}
                        flex={0}
                        enablePivot={true}
                        enableValue={true}
                        columnGroupShow='open'
                        enableRowGroup={true}
                    />
                    <AgGridColumn
                        field='TVPI'
                        headerName='TVPI'
                        filter='agNumberColumnFilter'                        
                        width={100}
                        flex={0}
                        enableValue={true}
                        enablePivot={true}
                        columnGroupShow='open'
                        enableRowGroup={true}
                    />
                    <AgGridColumn
                        field='RVPI'
                        headerName='RVPI'
                        filter='agNumberColumnFilter'                        
                        width={100}
                        flex={0}
                        enableValue={true}
                        enablePivot={true}
                        columnGroupShow='open'
                        enableRowGroup={true}
                    />
                    <AgGridColumn
                        field='PiCC'
                        headerName='PiCC'
                        filter='agNumberColumnFilter'                        
                        width={100}
                        flex={0}
                        enableValue={true}
                        enablePivot={true}
                        columnGroupShow='open'
                        enableRowGroup={true}
                    />
                    <AgGridColumn
                        field='totalCommitments'
                        headerName='Commited Capital'                           
                        filter='agNumberColumnFilter'
                        width={150}
                        flex={0}
                        hide={true}
                        enableValue={true}
                        enablePivot={true}
                        columnGroupShow='open'
                        enableRowGroup={true}
                    />
                    <AgGridColumn
                        field='calledCapital'
                        headerName='Called Capital'                       
                        filter='agNumberColumnFilter'
                        hide={true}
                        width={120}
                        flex={0}
                        enableValue={true}
                        enablePivot={true}
                        columnGroupShow='open'
                        enableRowGroup={true}
                    />
                    <AgGridColumn
                        field='undrawnCapital'
                        headerName='Undrawn Commitment'                       
                        filter='agNumberColumnFilter'
                        width={120}
                        flex={0}
                        hide= {true}
                        enableValue={true}
                        enablePivot={true}
                        columnGroupShow='open'
                        enableRowGroup={true}
                    />
                    <AgGridColumn
                        field='distributedCapital'
                        headerName='Distributed capital'                        
                        filter='agNumberColumnFilter'
                        width={150}
                        flex={0}
                        hide= {true}
                        enableValue={true}
                        enablePivot={true}
                        columnGroupShow='open'
                        enableRowGroup={true}
                    />
                    <AgGridColumn
                        field='recallableCapital'
                        headerName='Recallable capital'                       
                        filter='agNumberColumnFilter'
                        width={150}
                        flex={0}
                        hide= {true}
                        enableValue={true}
                        enablePivot={true}
                        columnGroupShow='open'
                        enableRowGroup={true}
                    />
                    <AgGridColumn
                        field='totalInvestedPortfolioCompanies'
                        headerName='Total invested in Portfolio Companies'                       
                        filter='agNumberColumnFilter'
                        width={170}
                        flex={0}
                        hide= {true}
                        enableValue={true}
                        enablePivot={true}
                        columnGroupShow='open'
                        enableRowGroup={true}
                    />
                    <AgGridColumn
                        field='totalPortfolioFairValue'
                        headerName='Total Fair Value of Portfolio'
                        headerTooltip='Total fair value of portfolio'                       
                        filter='agNumberColumnFilter'
                        width={170}
                        flex={0}
                        hide= {true}
                        enableValue={true}
                        enablePivot={true}
                        columnGroupShow='open'
                        enableRowGroup={true}
                    />
                    <AgGridColumn
                        field='totalAdditionalCapital'
                        headerName='Total Additional Capital'                        
                        filter='agNumberColumnFilter'
                        width={170}
                        flex={0}
                        hide= {true}
                        enableValue={true}
                        enablePivot={true}
                        columnGroupShow='open'
                        enableRowGroup={true}
                    />
                    <AgGridColumn
                        field='carryPaid'
                        headerName='Carry Paid'                        
                        filter='agNumberColumnFilter'
                        width={120}
                        flex={0}
                        hide= {true}
                        enableValue={true}
                        enablePivot={true}
                        columnGroupShow='open'
                        enableRowGroup={true}
                    />
                    <AgGridColumn
                        field='managementFeePaid'
                        headerName='Management Fee'                        
                        filter='agNumberColumnFilter'
                        width={150}
                        flex={0}
                        hide= {true}
                        enableValue={true}
                        enablePivot={true}
                        columnGroupShow='open'
                        enableRowGroup={true}
                    />
                    <AgGridColumn
                        field='dataAsOf'
                        headerName='Data As Of'
                        filter='agDateColumnFilter'                        
                        width={120}
                        flex={0}
                        hide= {true}
                        enableValue={true}
                        enablePivot={true}
                        columnGroupShow='open'
                        enableRowGroup={true}
                    />
                </AgGridReact>
            </div>            
        </div>
    )
}

export default CustomAGGrid;