import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.css';
import './onboarding/welcome/styles.css'
import './onboarding/login/styles.css'
import './onboarding/register/styles.css'
import '../components/styles.css'
import './dashboard/simulation/styles.scss'
import './dashboard/simulation/company_level.scss'
import '../components/g6.css';
import Head from 'next/head';
import PropTypes from 'prop-types';
import { CacheProvider } from '@emotion/react';
import theme from '../config/theme';
import createEmotionCache from '../config/createEmotionCache';
import { LicenseManager } from 'ag-grid-enterprise';
LicenseManager.setLicenseKey('CompanyName=digital dandelion,LicensedApplication=aztec-innovation-hub,LicenseType=SingleApplication,LicensedConcurrentDeveloperCount=1,LicensedProductionInstancesCount=1,AssetReference=AG-018073,ExpiryDate=14_August_2022_[v2]_MTY2MDQzMTYwMDAwMA==f8ad810315c072f84d6f66fca800124e');

import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    uri: 'https://us-central1-aztec-technical-poc.cloudfunctions.net/apollo-graphql-example/graphql',
    cache: new InMemoryCache()
});

const clientSideEmotionCache = createEmotionCache();

const MyApp = ({ Component, pageProps, emotionCache = clientSideEmotionCache}) => {    
    return (
        <CacheProvider value={emotionCache}>
            <Head>
                <title>Bossnet</title>
                <meta name="viewport" content="initial-scale=1, width=device-width" />
            </Head>
            <ApolloProvider client={client}>
                <Component {...pageProps} />
            </ApolloProvider>
        </CacheProvider>
    )
}

export default MyApp;

MyApp.propTypes = {
    Component: PropTypes.elementType.isRequired,
    emotionCache: PropTypes.object,
    pageProps: PropTypes.object.isRequired,
};
