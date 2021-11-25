import { useEffect, useState } from 'react';
import dynamic from "next/dynamic";
const ForcastingGraphComponent = dynamic(() => import("../../../components/forcasting_graph_component"), { ssr: false });

const ForcastingGraph = ({
    chart_data_market,
    chart_data_company,
    selectedMarketFactor,
    setSelectedMarketFactor,
    selectedCompFactor,
    setSelectedCompFactor,
    forcatstCompStartDate,
    forcatstCompEndDate,
    forcatstCompNextDate,
    forcatsMarketStartDate,
    forcatstMarketEndDate,
    forcatstMarketNextDate,
}:{
    chart_data_market:any,
    chart_data_company:any,
    selectedMarketFactor:any,
    setSelectedMarketFactor:any,
    selectedCompFactor:any,
    setSelectedCompFactor:any,
    forcatstCompStartDate:any,
    forcatstCompEndDate:any,
    forcatstCompNextDate:any,
    forcatsMarketStartDate:any,
    forcatstMarketEndDate:any,
    forcatstMarketNextDate:any,
}) => {

    const [marketFactor, setMarketFactor] = useState([])
    const [companyFactor, setCompanyFactor] = useState([])

    return (
        <div className="container_main_center">
            <div className="graph_bg">
                <div className="d-flex" style={{ width: "100%" }}>

                    <ForcastingGraphComponent
                        data={chart_data_market}
                        id={"chartdiv_market"}
                        name="Market Factor"
                        selectedFactor={selectedMarketFactor}
                        startDate={forcatsMarketStartDate}
                        nextDate={forcatstMarketNextDate}
                        endDate={forcatstMarketEndDate}
                        setSelectedFactor={setSelectedMarketFactor} />

                </div>

                <div className="d-flex" style={{ width: "100%", marginTop: "10px" }}>

                    <ForcastingGraphComponent
                        data={chart_data_company}
                        id={"chartdiv_company"}
                        name="Company Performance"
                        selectedFactor={selectedCompFactor}
                        startDate={forcatstCompStartDate}
                        nextDate={forcatstCompNextDate}
                        endDate={forcatstCompEndDate}
                        setSelectedFactor={setSelectedCompFactor} />

                </div>
            </div>
        </div>
    )
}

export default ForcastingGraph