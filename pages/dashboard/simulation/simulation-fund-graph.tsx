import React from 'react';
import G6Simulation from '../../../components/g6-simulation';

const SimulationFundGraph = ({
    entities,
    trends,
    selectedMacroFactor,
    selectedTrendFactor
}) => {
    return (
        <div id="sme_simulation_graph" className="position-relative">
            <G6Simulation macroFactor={selectedMacroFactor} trends={selectedTrendFactor} />
            {/* <div className="sme_abs_node sme_center_node">
                <svg width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M28.7778 16.444V-0.000488281H8.22222V8.22173H0V36.9995H16.4444V28.7773H20.5556V36.9995H37V16.444H28.7778ZM8.22222 32.8884H4.11111V28.7773H8.22222V32.8884ZM8.22222 24.6662H4.11111V20.5551H8.22222V24.6662ZM8.22222 16.444H4.11111V12.3328H8.22222V16.444ZM16.4444 24.6662H12.3333V20.5551H16.4444V24.6662ZM16.4444 16.444H12.3333V12.3328H16.4444V16.444ZM16.4444 8.22173H12.3333V4.11062H16.4444V8.22173ZM24.6667 24.6662H20.5556V20.5551H24.6667V24.6662ZM24.6667 16.444H20.5556V12.3328H24.6667V16.444ZM24.6667 8.22173H20.5556V4.11062H24.6667V8.22173ZM32.8889 32.8884H28.7778V28.7773H32.8889V32.8884ZM32.8889 24.6662H28.7778V20.5551H32.8889V24.6662Z" fill="#1EE8B7"/>
                </svg>
                <div className="sme_node_connector"></div>
                <div className="sme_node_connector"></div>
                <div className="sme_node_connector"></div>
                <div className="sme_node_connector"></div>
                <div className="sme_node_connector"></div>
                <div className="sme_node_connector"></div>
                <div className="sme_node_icon_connector"></div>
                
                <div className="sme_node_label sme_node_label_1">{entities ? entities[0] : 'Country Stock Index'}</div>
                <div className="sme_node_label sme_node_label_2">{entities ? (entities[2] !== undefined ? entities[2] : 'Consumer index') : 'Consumer index'}</div>
                <div className="sme_node_label sme_node_label_3">{entities ? (entities[2] !== undefined ? entities[2] : trends[2]?.macro_trend) : 'Economic growth rates'}</div>
                <div className="sme_node_label sme_node_label_4">{trends ? trends[0]?.macro_trend : 'Population Income'}</div>
                <div className="sme_node_label sme_node_label_5">{trends ? trends[1]?.macro_trend : 'Macro Economy'}</div>
                <div className="sme_node_text d-inline-block">
                    <svg width="35" height="35" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.3234 23.1352C17.3256 23.1352 17.328 23.1352 17.3302 23.1353C17.5474 23.137 17.751 23.2233 17.9034 23.3782C18.0557 23.5332 18.1387 23.7382 18.1369 23.9555L19.3673 23.9657C19.3718 23.4198 19.1636 22.9047 18.7806 22.5154C18.5453 22.2761 18.2612 22.1022 17.9505 22.0026V20.6743H16.72V21.9951C16.411 22.0902 16.1272 22.2583 15.8901 22.4916C15.5009 22.8744 15.284 23.3859 15.2796 23.9319C15.2751 24.4779 15.4834 24.9929 15.8663 25.3822C16.2492 25.7715 16.7607 25.9884 17.3067 25.9928C17.5239 25.9945 17.7275 26.0808 17.8799 26.2358C18.0323 26.3907 18.1152 26.5957 18.1134 26.8131C18.1117 27.0303 18.0254 27.2339 17.8704 27.3863C17.7171 27.537 17.5149 27.6198 17.3001 27.6198C17.2979 27.6198 17.2955 27.6198 17.2932 27.6197C16.8446 27.616 16.4827 27.2481 16.4864 26.7995L15.2559 26.7894C15.2483 27.721 15.8685 28.5135 16.7201 28.7659V30.0807H17.9506V28.7445C18.2412 28.6472 18.5083 28.4848 18.7332 28.2636C19.1226 27.8807 19.3394 27.3692 19.3439 26.8233C19.3484 26.2774 19.1401 25.7622 18.7572 25.373C18.3743 24.9837 17.8629 24.7668 17.3168 24.7623C16.8683 24.7587 16.5063 24.3907 16.51 23.942C16.5135 23.4958 16.8778 23.1352 17.3234 23.1352Z" fill="#1EE8B7"/>
                        <path d="M35.2876 0H33.4267L27.0734 8.82968H29.4805V11.447L4.0498 11.4316V15.1234H0.358398V35.6313H4.66504V34.4008H1.58887V16.3539H25.1739V15.1234H5.28027V12.6629L29.4805 12.6774V15.1234H26.4044V16.3539H29.4805V18.035L29.0299 17.5844H5.64072L2.81934 20.4058V30.349L5.64072 33.1704H17.3054C17.3075 33.1704 17.3096 33.1705 17.3117 33.1705C17.3136 33.1705 17.3154 33.1704 17.3173 33.1704H29.0299L29.4805 32.7198V34.4009H5.89551V35.6313H29.4805V42H39.2339V37.3966H38.0034V40.7695H30.7109V7.59921H29.4747L34.0572 1.23047H34.6571L39.2397 7.59921H38.0034V36.166H39.2339V8.82968H41.6411L35.2876 0ZM6.15038 31.9398L4.04989 29.8393V20.9153L6.15038 18.8149H13.113C10.9529 20.2018 9.51883 22.6253 9.51883 25.3774C9.51883 28.1295 10.9528 30.5529 13.1129 31.9399L6.15038 31.9398ZM28.5202 31.9398H21.526C22.2981 31.4418 22.987 30.8023 23.5589 30.0366L22.573 29.3003C21.3213 30.9762 19.4059 31.938 17.3173 31.9398H17.3085C13.6913 31.938 10.7492 28.9948 10.7492 25.3774C10.7492 21.7588 13.6932 18.8149 17.3117 18.8149C20.9303 18.8149 23.8742 21.7588 23.8742 25.3774C23.8742 26.4219 23.636 27.4204 23.1661 28.3454L24.2631 28.9026C24.8216 27.8035 25.1047 26.6174 25.1047 25.3774C25.1047 22.6252 23.6706 20.2017 21.5105 18.8148H28.5202L29.4805 19.7751V30.9794L28.5202 31.9398Z" fill="#1EE8B7"/>
                        <path d="M35.5425 8.21436H36.7729V11.9058H35.5425V8.21436Z" fill="#1EE8B7"/>
                        <path d="M35.5425 13.1362H36.7729V14.3667H35.5425V13.1362Z" fill="#1EE8B7"/>
                        <path d="M35.5425 15.5972H36.7729V16.8276H35.5425V15.5972Z" fill="#1EE8B7"/>
                        <path d="M20.7109 24.7622H21.9414V25.9927H20.7109V24.7622Z" fill="#1EE8B7"/>
                        <path d="M12.6821 24.7622H13.9126V25.9927H12.6821V24.7622Z" fill="#1EE8B7"/>
                        <path d="M31.9414 38.3086H33.1719V39.5391H31.9414V38.3086Z" fill="#1EE8B7"/>
                    </svg>
                </div>            
            </div> */}
        </div>
    );
}

export default SimulationFundGraph;