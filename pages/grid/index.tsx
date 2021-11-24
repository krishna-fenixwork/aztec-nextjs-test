import React, { useState } from 'react';
import dynamic from "next/dynamic";
import Link from 'next/link';
import { GetStaticProps } from 'next';
const CustomAGGrid = dynamic(() => import("../../components/ag_grid"), { ssr: false });


const AGGridDemo = ({ data }) => {    

    const [gridApi, setGridApi] = useState(null);
    const [gridColumnApi, setGridColumnApi] = useState(null);
    const [selected, setSelected] = useState(false);

    const rowData = [
        {make: "Toyota", model: "Celica", price: 35000},
        {make: "Ford", model: "Mondeo", price: 32000},
        {make: "Porsche", model: "Boxter", price: 72000}
    ];

    const getRowStyle = params => {
        if (params.node.rowIndex % 2 !== 0)
            return { background: 'rgba(255, 255, 255, 0.1)' };
    };

    const onGridReady = (params) => {
        setGridApi(params.api);
        setGridColumnApi(params.columnApi);
    };   

    return (
        <>
            <Link href="/"><a>Go back</a></Link>
            <CustomAGGrid  
                quarterReportData={data}
                tableHeight={{ height: '60vh' }}
                rowStyle={{ background: 'rgba(0, 0, 0, 0.1)', color: '#fff' }}
                getRowStyle={getRowStyle}
                onGridReady={onGridReady}                                
                selected={true}                
                setSelected={setSelected}                
            />
        </>
    )
}

export default AGGridDemo;

export const getStaticProps: GetStaticProps = async () => {
    // const body = JSON.stringify({
    //     uid: '2FuOBMFPnNTSlz3nl2GcAfdv74g1', 
    //     fund_name: 'Highland Fund II', 
    //     benchmark_names: ["Preqin Worldwide", "Aztec All Europe", "Preqin Europe", 
    //     "Cambridge Associates Europe", "Aztec AI benchmark", "Aztec Tech Europe"], 
    //     gp_name: 'Highland'
    // })
    const res = await fetch(`https://us-central1-aztec-technical-poc.cloudfunctions.net/report_ops/get_data?report_id=fund_performance`, {
        headers: { uid: '95rsVQGTYhXtNBbDHZt7g9sQuu42'},
        // method: 'POST',
        // body
    })
    const data = await res.json()
  
    if (!data) {
        return {
            notFound: true,
        }
    }
  
    return {
        props: { data: data?.data?.annual }, // will be passed to the page component as props
    }
    
}