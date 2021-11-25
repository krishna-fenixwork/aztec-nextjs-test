import React, { useState } from 'react'
import { LicenseManager } from 'ag-grid-enterprise';
LicenseManager.setLicenseKey('CompanyName=digital dandelion,LicensedApplication=aztec-innovation-hub,LicenseType=SingleApplication,LicensedConcurrentDeveloperCount=1,LicensedProductionInstancesCount=1,AssetReference=AG-018073,ExpiryDate=14_August_2022_[v2]_MTY2MDQzMTYwMDAwMA==f8ad810315c072f84d6f66fca800124e');
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

const SimulationTable = ({
    data
}:{
    data:any
}) => {
    const [gridApi, setGridApi] = useState(null);
    const [gridColumnApi, setGridColumnApi] = useState(null);

    const rowStyle = { background: 'rgba(0, 0, 0, 0.1)', color: "#fff" };

    const getRowStyle = () => {
        return { background: 'rgba(0, 0, 0, 0.1)', color: "#fff" };
    };

    const onGridReady = (params:any) => {
        setGridApi(params.api);
        setGridColumnApi(params.columnApi);
    };

    const onExportTable = () => {
        var spreadsheets = [];
        // @ts-ignore: Object is possibly 'null'.
        gridApi.forEachNode((node:any, index:any) => {
            if (index % 100 === 0) {
                // @ts-ignore: Object is possibly 'null'.
                gridApi.deselectAll();
            }
            node.setSelected(true);
            if (index % 100 === 99) {
                // @ts-ignore: Object is possibly 'null'.
                spreadsheets.push(gridApi.getSheetDataForExcel({ onlySelected: true }));
            }
        });// @ts-ignore: Object is possibly 'null'.
        if (gridApi.getSelectedNodes().length) {
            // @ts-ignore: Object is possibly 'null'.
            spreadsheets.push(gridApi.getSheetDataForExcel({ onlySelected: true }));
            // @ts-ignore: Object is possibly 'null'.
            gridApi.deselectAll();
        }
        // @ts-ignore: Object is possibly 'null'.
        gridApi.exportMultipleSheetsAsExcel({ data: spreadsheets });
    };

    return (
        <div className='full-width table-container flex-column m-margin-bottom' style={{ position: 'relative' }}>

            <div style={{ paddingTop: "18px", paddingRight: "40px" }}>
                <div className="iconsContainer align-self-end">
                    <div className='s-padding font-white h2-small' onClick={() => onExportTable()}>
                        Export Table
                    </div>
                </div>
            </div>

            <div className="ag-theme-alpine Back full-width " style={{
                height: '500px',
                width: '100%',
                padding: "10px 40px",
            }} >

                <AgGridReact
                    rowStyle={rowStyle}
                    getRowStyle={getRowStyle}
                    rowData={data}
                    rowSelection="multiple"
                    suppressRowClickSelection={true}
                    defaultColDef={{
                        editable: true,
                        sortable: true,
                        minWidth: 100,
                        filter: true,
                        resizable: true,
                        // floatingFilter: true,
                        flex: 1,
                    }}
                    components={{
                        rowNodeIdRenderer: function (params:any) {
                            return params.node.id + 1;
                        },
                    }}

                    pagination={true}

                    paginationPageSize={50}
                    onGridReady={onGridReady}
                    enableCharts={true}
                    enableRangeSelection={true}
                    rowDragManaged={true}
                    animateRows={true}>

                    <AgGridColumn headerName="Revenue">

                        <AgGridColumn field="revenue_positive" headerName="Optimistic" minWidth={120} />

                        <AgGridColumn field="revenue_optimist" headerName="Median" minWidth={120} />

                        <AgGridColumn field="revenue_negetive" headerName="Pessimistic" minWidth={120} />

                    </AgGridColumn>

                    <AgGridColumn headerName="Employees">

                        <AgGridColumn field="employees_positive" headerName="Optimistic" minWidth={120} />

                        <AgGridColumn field="employees_optimist" headerName="Median" minWidth={120} />

                        <AgGridColumn field="employees_negetive" headerName="Pessimistic" minWidth={120} />

                    </AgGridColumn>

                    <AgGridColumn headerName="Digital Footprint">

                        <AgGridColumn field="digital_positive" headerName="Optimistic" minWidth={120} />

                        <AgGridColumn field="digital_optimist" headerName="Median" minWidth={120} />

                        <AgGridColumn field="digital_negetive" headerName="Pessimistic" minWidth={120} />

                    </AgGridColumn>

                    <AgGridColumn headerName="Social Score">

                        <AgGridColumn field="social_positive" headerName="Optimistic" minWidth={120} />

                        <AgGridColumn field="social_optimist" headerName="Median" minWidth={120} />

                        <AgGridColumn field="social_negetive" headerName="Pessimistic" minWidth={120} />

                    </AgGridColumn>


                </AgGridReact>

            </div>

        </div>

    )
}

export default SimulationTable
