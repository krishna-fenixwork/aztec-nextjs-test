export const CONFIG = {
    IS_PROD: true,
    ENV_PROD : "PROD",
    ENV_DEV : "DEV",
    DEVELOPMENT_API_HOST: 'https://us-central1-aztec-technical-poc.cloudfunctions.net/',
    PRODUCTION_API_HOST: 'https://us-central1-aztec-prod.cloudfunctions.net/',
    USER_TYPE: 1,
    FLAG_TRUE: '1',
    FLAG_FALSE: '0',
    NOTIFY_SUCCESS: 'success',
    NOTIFY_FAILURE: 'error',
    NOTIFY_INFO: 'info',
    SINGLE_SELECT: 'SS',
    MULTI_SELECT: 'MS',
    NEO4J: {
        username: 'neo4j',        
        server_uri: 'bolt://neo4j.aztec-innovation-hub.com',
        password: 'panic-greek-guitar-compact-orca-3903'
    }
};