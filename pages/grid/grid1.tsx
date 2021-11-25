import dynamic from "next/dynamic";
import Link from 'next/link';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { GetServerSideProps } from 'next';
const AGGridSSR = dynamic(() => import("../../components/reporting/ag-grid-table/ag_grid_ssr"), { ssr: false });

const Grid1 = ({ kpi_data, quarterly_data }:{ kpi_data:any, quarterly_data:any }) => {
    return (
        <>
            <AGGridSSR quarterlyData={quarterly_data} />
        </>
    )
}

export default Grid1;

export const getServerSideProps: GetServerSideProps = async (context) => {
    
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
                        }
                    }
                }
            }
        `
    });  
    
    return {
        props: { 
            kpi_data: response?.data?.organisations[0]?.home_page,
            quarterly_data: table_response?.data?.organisations[0]?.fund_performance?.quarterly
        }, // will be passed to the page component as props
    }

}