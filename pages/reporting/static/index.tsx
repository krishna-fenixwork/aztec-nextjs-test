import React from 'react';
import dynamic from "next/dynamic";
import { ApolloClient, InMemoryCache, gql , useQuery} from '@apollo/client';
import { GetStaticProps } from 'next';

const KPIBOX = dynamic(() => import("../../../components/reporting/kpi-boxes/kpi-box"), { ssr: false });
const AGGridSSR = dynamic(() => import("../../../components/reporting/ag-grid-table/ag_grid_ssr"), { ssr: false });

const ReportingStatic = ({ kpi_data, quarterly_data }) => {   

    // const { data } = useQuery(kpi_response)
    
    // React.useEffect(() => {
    //     console.time('logtime') 
    //     console.log(kpidata)
    //     console.log(kpiLoading)
    //     console.log(tabledata)        
    //     console.timeEnd('logtime')
    // }, [kpiLoading, kpidata, tabledata])

    return (
        <div id="reporting" style={{backgroundColor: '#0E1118', padding: 40}}>
            <KPIBOX kpiData={kpi_data} />
            <div className="mt-5 full-width table-container">
                <AGGridSSR quarterlyData={quarterly_data} />
            </div>
        </div>
    );
}

export default ReportingStatic;

export const getStaticProps: GetStaticProps = async (context) => {
    console.time('logtime') 

    const client = new ApolloClient({
        uri: 'https://us-central1-aztec-technical-poc.cloudfunctions.net/apollo-graphql-example/graphql',
        cache: new InMemoryCache()
    });

    const response = await client.query({
        query: gql`            
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
        `
    });

    const table_response = await client.query({
        query: gql`            
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
        `
    });  
    console.timeEnd('logtime');    

    return {
        props: { 
            kpi_data: response?.data?.organisations[0]?.home_page,
            quarterly_data: table_response?.data?.organisations[0]?.fund_performance?.quarterly
        }, // will be passed to the page component as props
    }

}