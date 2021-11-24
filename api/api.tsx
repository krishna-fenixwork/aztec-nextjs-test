import { getUser } from '../services/common_services';
import { RESTAPI } from './rest_api';
import {BASEURL, HOSTURL} from '../constants/envConstants';

export const getUserData = (uid) => {
    return fetch(BASEURL + RESTAPI.GET_USER_DATA + '?uid=' + uid, {
        headers: { uid }
    })
        .then(response => response.json())
}

export const getOrgData = (orgId) => {
    return fetch(BASEURL + RESTAPI.GET_ORGANISATION_DATA + '?uuid=' + orgId, {
        headers: { uid: getUser().uid }
    })
        .then(response => response.json())
}

export const getHomeData = (orgId) => {
    return fetch(BASEURL + RESTAPI.GET_HOME_DATA + '?uuid=' + orgId, {
        headers: { uid: getUser().uid }
    })
        .then(response => response.json())
}

export const getUsers = (domain) => {
    return fetch(BASEURL + RESTAPI.GET_USERS + '?domain=' + domain + '&uid=' + getUser().uid, {
        headers: { uid: getUser().uid }
    })
        .then(response => response.json())
}

export const setUserData = (uid, name, email, photoURL, domain, org_Id, gp_Name) => {
    const body = JSON.stringify({ uid, org_Id, gp_Name, name, email, photoURL, domain })

    return fetch(BASEURL + RESTAPI.SET_USER_DATA, {
        method: 'POST',
        headers: { uid, 'Content-Type': 'application/json' },
        body
    })
        .then(response => response.json())
}

export const verifyUser = (uid, verification_Key) => {
    const body = JSON.stringify({ verification_Key })

    return fetch(BASEURL + RESTAPI.VERIFY_USER, {
        method: 'POST',
        headers: { uid, 'Content-Type': 'application/json' },
        body
    })
        .then(response => response.json())
}

export const saveUserPermissions = (user_Uid, permissions) => {
    const body = JSON.stringify({ user_Uid, permissions })

    return fetch(BASEURL + RESTAPI.SAVE_USER_PERMISSIONS, {
        method: 'POST',
        headers: { uid: getUser().uid, 'Content-Type': 'application/json' },
        body
    })
        .then(response => response.json())
}

export const getReports = (report_Id) => {
    const uid = getUser().uid;

    return fetch(BASEURL + RESTAPI.GET_REPORTS + '?report_id=' + report_Id, {
        headers: { uid, 'Content-Type': 'application/json' }
    })
        .then(response => response.json())
}

export const getRecomendationPreview = (fund_id, type) => {
    const body = JSON.stringify({ fund_id, type })
    return fetch(HOSTURL + RESTAPI.GET_RECOMMENDATION_PREVIEW, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body
    })
        .then(response => response.json())
}

export const getRecomendationSummary = (company_uuid) => {
    const body = JSON.stringify({ uuid: company_uuid })
    return fetch(HOSTURL + RESTAPI.GET_RECOMENDATION_SUMMARY, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body
    })
        .then(response => response.json())
}

// export const getRecomendation = (fund_id) => {
//     const uid = getUser().uid;
//     const auth = { uid: uid }
//     const body = JSON.stringify({ uid, fund_id })
//     return fetch(BASEURL + RESTAPI.GET_RECOMENDATION + '?fund_id='+fund_id)
//         .then(response => response.json())
// }

export const getCompanyDetails = (uuid, endpoint) => {
    const body = JSON.stringify({ uuid })
    return fetch(HOSTURL + RESTAPI.COMAPNY_DETAILS + endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body
    })
        .then(response => response.json())
}

export const serachCompany = (query) => {
    return fetch(HOSTURL + RESTAPI.SEARCH_COMPANY + '?query=' + query, {
    })
        .then(response => response.json())
}

export const getMarketFactor = (macro_trends, entities, period) => {
    const body = JSON.stringify({ macro_trends, entities, period })
    return fetch(HOSTURL + RESTAPI.GET_MARKET_COMPANY, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body
    })
        .then(response => response.json())
}

export const getCompanyPerformance = (macro_trends, entities, period) => {
    const body = JSON.stringify({ macro_trends, entities, period })
    return fetch(HOSTURL + RESTAPI.GET_COMPANY_PERFORMANCE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body
    })
        .then(response => response.json())
}

export const getAutoCompleteForecasting = (query) => {
    return fetch(HOSTURL + RESTAPI.SEARCH_COMPANY + '?query=' + query)
        .then(response => response.json())
}

export const getFundGraph = (uuid) => {
    return fetch(HOSTURL + RESTAPI.GET_FUND_GRAPH + '?uuid=' + uuid)
        .then(response => response.json())
}

export const getPredictEntity = (data) => {
    const body = JSON.stringify(data)
    return fetch(HOSTURL + RESTAPI.PREDICT_TREND_ENTITIES, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body
    }).then(response => response.json())
}

export const getBenchmarkKpiData = (fund_name, gp_name) => {
    const uid = getUser().uid;
    const body = JSON.stringify({ uid, fund_name, gp_name })
    return fetch(BASEURL + RESTAPI.GET_BENCHMARK_KPI, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body
    })
        .then(response => response.json())
}

export const getBenchmarkChartData = (fund_name, gp_name) => {
    const uid = getUser().uid;
    const body = JSON.stringify({ uid, fund_name, gp_name })
    return fetch(BASEURL + RESTAPI.GET_BENCHMARK_CHART, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body
    })
        .then(response => response.json())
}

export const getBenchmarkData = (fund_name, gp_name) => {
    const uid = getUser().uid;
    const body = JSON.stringify({ uid, fund_name, gp_name })
    return fetch(BASEURL + RESTAPI.GET_BENCHMARK_DATA, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body
    })
        .then(response => response.json())
}

export const getBenchmarkTableData = (fund_name, benchmark_names, gp_name) => {
    const uid = getUser().uid;
    const body = JSON.stringify({ uid, fund_name, benchmark_names, gp_name })
    return fetch(BASEURL + RESTAPI.GET_BENCHMARK_TABLE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body
    }).then(response => response.json())
}

export const getQueryResult = () => {
    return fetch(HOSTURL + RESTAPI.KEYLINE, {
    })
        .then(response => response.json())
}
export const getBenchmarkCreateData = (fund_name, gp_name) => {
    const uid = getUser().uid;
    const body = JSON.stringify({ uid, fund_name, gp_name })
    return fetch(BASEURL + RESTAPI.GET_BENCHMARK_CREATE_DATA, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body
    }).then(response => response.json())
}

export const addNewBenchmark = (external_funds, fund_name, name, gp_name) => {
    const uid = getUser().uid;
    const body = JSON.stringify({ uid, external_funds, fund_name, name, gp_name })
    return fetch(BASEURL + RESTAPI.ADD_BENCHMARK_TABLE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body
    }).then(response => response.json())
}
export const createNewBenchmark = (fund_name, name, gp_name) => {
    const uid = getUser().uid;
    const body = JSON.stringify({ uid, fund_name, name, gp_name })
    return fetch(BASEURL + RESTAPI.ADD_BENCHMARK_DATA, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body
    }).then(response => response.json())
}
export const deleteBenchmark = (fund_name, name, gp_name) => {
    const uid = getUser().uid;
    const body = JSON.stringify({ uid, fund_name, name, gp_name })
    return fetch(BASEURL + RESTAPI.DELETE_BENCHMARK_DATA, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body
    }).then(response => response.json())
}
export const getMacroTrends = (uuid) => {
    return fetch(HOSTURL + RESTAPI.GET_MACRO_TRENDS + '?uuid=' + uuid)
        .then(response => response.json())
}

export const getEntities = (uuid) => {
    return fetch(HOSTURL + RESTAPI.GET_ENTITIES + '?uuid=' + uuid)
        .then(response => response.json())
}
export const addBoxData = (company, type) => {
    const uid = getUser().uid;
    const body = JSON.stringify({ uid, company, type })
    return fetch(BASEURL + RESTAPI.ADD_KPI_DATA, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', uid },
        body
    }).then(response => response.json())
}

export const uploadProfileImage = (data_url) => {
    const uid = getUser().uid;
    const body = JSON.stringify({ image: data_url })

    return fetch(BASEURL + RESTAPI.UPLOAD_IMAGE, {
        method: 'POST',
        headers: { uid, 'Content-Type': 'application/json' },
        body
    }).then(response => response.json())
}

export const updateProfile = (data) => {
    const uid = getUser().uid;
    const body = JSON.stringify(data)

    return fetch(BASEURL + RESTAPI.UPDATE_PROFILE, {
        method: 'POST',
        headers: { uid, 'Content-Type': 'application/json' },
        body
    }).then(response => response.json())
}

export const getConfig = () => {
    return fetch(BASEURL + RESTAPI.GET_CONFIG)
        .then(response => response.json())
}
export const getOrgGPDetails = (org_id) => {
    const uid = getUser().uid;
    return fetch(BASEURL + RESTAPI.GET_GP_DETAILS + '?uuid=' + org_id, {
        headers: { uid, 'Content-Type': 'application/json' }
    })
        .then(response => response.json())
}