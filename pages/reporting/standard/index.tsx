import React, { useState, useEffect } from 'react';
import dynamic from "next/dynamic";
import { ApolloClient, InMemoryCache, gql , useQuery} from '@apollo/client';

const KPIBOX = dynamic(() => import("../../../components/reporting/kpi-boxes/kpi-box"), { ssr: false });
const AGGridSSR = dynamic(() => import("../../../components/reporting/ag-grid-table/ag_grid_ssr"), { ssr: false });

// const client = new ApolloClient({
//     uri: 'https://us-central1-aztec-technical-poc.cloudfunctions.net/apollo-graphql-example/graphql',
//     cache: new InMemoryCache()
// });

const kpiBoxQuery = gql`            
    query Organisations{
        organisations(uuid:"11af7a92-5642-c8ae-22af-d637798b4abd") {
            home_page {
                company
                Quarter {
                    isGrow
                    profit
                    KPI
                    percent
                    statistics
                }
                KPI
                active_index
            }
        }
    }
`;

const fundPerformanceQuery = gql`            
    query Organisations{
        organisations(uuid:"11af7a92-5642-c8ae-22af-d637798b4abd") {
            fund_performance{
                quarterly {
                    fundName
                    managementFeePaid
                    distributionsCapitalDPI
                    netMOIC
                    undrawnCapital
                    dataAsOfQuarter
                    grossIRR
                    netIRR
                    grossMOIC                            
                    NAV
                    TVPI
                    RVPI
                    PiCC
                    totalCommitments
                    calledCapital
                    distributedCapital
                    recallableCapital
                    totalInvestedPortfolioCompanies
                    totalPortfolioFairValue
                    totalAdditionalCapital
                    carryPaid
                    dataAsOf
                }
            }
        }
    }
`;

const ReportingStandard = () => {   

    const { data:kpi_data, loading:kpi_loading, error:kpi_error } = useQuery(kpiBoxQuery)
    const { data:quarterly_data, loading:quarterly_loading, error:quarterly_error } = useQuery(fundPerformanceQuery)   

    const [kpis, setKpis] = useState([])
    const [funds, setFunds] = useState([])

    useEffect(() => {
        // console.log(kpi_data, quarterly_data)
        if(kpi_loading === false && kpi_data) setKpis(kpi_data?.organisations[0]?.home_page)
        if(quarterly_loading === false && quarterly_data) setFunds(quarterly_data?.organisations[0]?.fund_performance?.quarterly)

        // const kpiData = kpi_data?.data?.organisations[0]?.home_page;
        // const quarterlyData = quarterly_data?.data?.organisations[0]?.fund_performance?.quarterly;
        
        
    }, [kpi_data, kpi_loading, quarterly_data, quarterly_loading])

    if (kpi_loading && quarterly_loading) {
        return (
            <h2 style={{textAlign:'center'}} className="mt-5">
                <a href="#loading" aria-hidden="true" className="aal_anchor" id="loading">
                    <svg aria-hidden="true" className="aal_svg" height="16" version="1.1" viewBox="0 0 16 16" width="16">
                        <path fillRule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path>
                    </svg>
                </a>Loading...
            </h2>
        )
    }
    
    if (kpi_error) {
        console.error(kpi_error);
        return null;
    }

    if (quarterly_error) {
        console.error(quarterly_error);
        return null;
    }    
  

    return (
        <div id="reporting" style={{backgroundColor: '#0E1118', padding: 40}}>
            <>               
                {
                    kpis.length > 0 && ( <KPIBOX kpiData={kpis} /> )
                }
                {
                    funds.length > 0 && (
                        <div className="mt-5 full-width table-container">
                            <AGGridSSR quarterlyData={funds} />
                        </div>
                    )
                }
            </>            
        </div>
    );
}

export default ReportingStandard;