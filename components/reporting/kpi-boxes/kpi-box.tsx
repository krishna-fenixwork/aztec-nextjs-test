import React from 'react';
import kpiStyles from './kpi-box.module.css';
import { Grid } from '@material-ui/core';
import { Sparklines, SparklinesLine } from 'react-sparklines';

const KPIBOX = ({ kpiData } : { kpiData:any }) => {

    const [kpi_data, setKPIData] = React.useState(kpiData);

    const changeBenchmark = (elemIndex:any, activeIndex:any) => {
        const tData = [...kpi_data];
        console.log(tData);
        if (activeIndex === (tData[elemIndex].Quarter.length - 1))
            tData[elemIndex].active_index = 0
        else
            tData[elemIndex].active_index = tData[elemIndex].active_index + 1

        setKPIData(tData)       
    }

    return (
        <div className="kpi__box d-flex flex-wrap">
            <Grid container spacing={4} className='grid-stack ps-3'>
            {
                kpi_data.map((item:any, index:any) => (
                    <Grid item xs={12} sm={12} md={6} lg={3} xl={3} className='grid-stack-item' key={index}>
                        <div className={kpiStyles.fund_gradient__bg}>
                            <div className={kpiStyles.fund_dark_gradient}>
                                <div className={kpiStyles.fund_stastics_container}>
                                    <div className={`${kpiStyles.fund_stastics_data} d-flex flex-column`}>
                                        <div className={`${kpiStyles.funds__stats} d-flex justify-content-between`}>
                                            <div>
                                                <p className={kpiStyles.fund_type}>{item?.Quarter ? item?.Quarter[item?.active_index].KPI : '-'}  </p>
                                                <p className={kpiStyles.az_fund__name}>{item?.company ?? '-'}</p>
                                            </div>
                                            <div>
                                                <div style={{ marginTop: 6 }}>
                                                    <div className={kpiStyles.az_stats_stepper}>
                                                        {item.Quarter.map((label:any, _index:any) => (
                                                            <div key={_index} className={`${kpiStyles.stepper__step} ${_index === item?.active_index ? `${kpiStyles.active_steeper}` : ''}`}></div>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className={`${kpiStyles.benchmark} mt-2`}  onClick={(e) => changeBenchmark(index, item?.active_index)}>
                                                    <div className={kpiStyles.fund_cta_btn}>KPI</div>
                                                    <svg width='8' height='8' viewBox='0 0 8 9' style={{ strokeWidth: '1.5px' }} fill='none' xmlns='http://www.w3.org/2000/svg'>
                                                        <path opacity='1' d='M1.23572 4.26318V2.80342C1.23572 0.993763 2.36527 0.250217 3.74476 1.15778L4.85508 1.89039L5.9654 2.623C7.34489 3.53057 7.34489 5.01219 5.9654 5.91976L4.85508 6.65237L3.74476 7.38498C2.36527 8.27614 1.23572 7.53806 1.23572 5.72294V4.26318Z' stroke='#1EE8B7' strokeMiterlimit='10' strokeLinecap='round' strokeLinejoin='round' />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={`${kpiStyles.funds__cta} d-flex flex-column`}>
                                            <div>
                                                <div className='d-flex justify-content-between'>
                                                    <div className={kpiStyles.fund_percent}>{item?.Quarter ? item?.Quarter[item?.active_index].percent : '-'}</div>                                                    
                                                </div>
                                                <div className={`${kpiStyles.fund_quarter} ${item?.Quarter[item?.active_index].isGrow ? '' : `${kpiStyles.fund_quarter_notgrow}`}`}>{item?.Quarter ? item?.Quarter[item?.active_index].profit : '-'}</div>
                                            </div>
                                        
                                        </div>
                                    </div>
                                    <div id={`ag_spark_${index}_anim`} className={kpiStyles.fund_stastics_graph} style={{ paddingBottom: '12px' }}>
                                        <Sparklines data={item.Quarter[item.active_index].statistics} style={{ display: 'flex' }}>
                                            <SparklinesLine style={{ strokeWidth: 2, stroke: `#1ee8b7`, fill: `#1ee8b7` }} />
                                        </Sparklines>
                                    </div>
                                </div>                               
                            </div>
                        </div>

                    </Grid>
                ))
            }
            </Grid>
        </div>
    );
}

export default KPIBOX;