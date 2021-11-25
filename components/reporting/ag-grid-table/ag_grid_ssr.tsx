import React, { useState } from 'react';
import { AgGridReact, AgGridColumn } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { columns } from './fundConfig';

const AGGridSSR = ({ quarterlyData } : {quarterlyData:any}) => {

    const [gridApi, setGridApi] = useState(null);
    const [gridColumnApi, setGridColumnApi] = useState(null);

    const onGridReady = (params:any) => {
        setGridApi(params.api);
        setGridColumnApi(params.columnApi);
    
        var dataSource = {
            rowCount: null,
            getRows: function (params:any) {
                console.log('asking for ' + params.startRow + ' to ' + params.endRow);
                setTimeout(function () {
                    var rowsThisPage = quarterlyData.slice(params.startRow, params.endRow);
                    var lastRow = -1;
                    if (quarterlyData.length <= params.endRow) {
                        lastRow = quarterlyData.length;
                    }
                    params.successCallback(rowsThisPage, lastRow);
                }, 500);
            },
        };      
        params.api.setDatasource(dataSource);
    
        // fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
        //   .then((resp) => resp.json())
        //   .then((data) => updateData(data));
    };

    function createServerSideDatasource(server:any) {
        return {
            getRows: function (params:any) {
                console.log('[Datasource] - rows requested by grid: ', params.request);
                var response = server.getData(params.request);
                setTimeout(function () {
                    if (response.success) {
                        params.success({ rowData: response.rows });
                    } else {
                        params.fail();
                    }
                }, 500);
            },
        };
    }

    function createFakeServer(allData:any) {
        return {
            getData: function (request:any) {
                var requestedRows = allData.slice();
                return {
                    success: true,
                    rows: requestedRows,
                };
            },
        };
    }

    return (
        <>
            <div style={{ width: '100%', height: '100%' }}>                
                <div
                    id="myGrid"
                    style={{
                        height: '83vh',
                        width: '100%',
                    }}
                    className="ag-theme-alpine"
                >
                    <AgGridReact
                        columnDefs={columns}
                        components={{
                            loadingRenderer: function (params:any) {
                                if (params.value !== undefined) {
                                    return params.value;
                                } else {
                                    return '<img src="https://www.ag-grid.com/example-assets/loading.gif">';
                                }
                            },
                        }}
                        rowBuffer={0}
                        rowSelection={'multiple'}
                        rowModelType={'infinite'}
                        cacheBlockSize={20}
                        cacheOverflowSize={5}
                        maxConcurrentDatasourceRequests={1}
                        infiniteInitialRowCount={10}
                        maxBlocksInCache={10}
                        onGridReady={onGridReady}
                        sideBar={{
                            toolPanels: ['columns', 'filters'],
                            defaultToolPanel: ''
                        }}>                            
                    </AgGridReact>
                </div>
            </div>
        </>
    )
}

export default AGGridSSR;
