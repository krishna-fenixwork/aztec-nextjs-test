/* eslint-disable jsx-a11y/alt-text */
import Image from 'next/image'
import home_logo from '../../aseets/ic_home_logo.png';
import { useState } from 'react';
import router, { useRouter } from 'next/router'
import Link from 'next/link'
import { LOGIN } from '../../../routes';

const WelcomePage = () => {
    const CONST = {
        SOLUTION: "SOLUTION",
        ABOUT: "ABOUT",
        LOGIN: "LOGIN",
        GET_STARTED: "GET_STARTED",
    }

    const [headSelected, setHeadSelected] = useState(CONST.SOLUTION)

    const handleHeaderClick = (TYPE:any) => {
        setHeadSelected(TYPE)
        if (TYPE === CONST.LOGIN) {
            router.push(LOGIN)
        }
    }

    const loader:any = ({ src, width, quality }: { src:any, width:any, quality:any }) => {
        return `https://www.ag-grid.com/${src}?w=${width}&q=${quality || 75}`
    }
    

    return (
        <div>
            <div id="gradT">
                <div className="secondaryContainerW">

                    <div className="topFlex">
                        <Image src={home_logo} height={150} width={150} loader={loader} />

                        <div style={{ display: 'flex', flexDirection: 'row' }}>

                            <button className="btn" style={headSelected === CONST.SOLUTION ?
                                { background: "#fff", color: "#000", marginLeft: 10, marginRight: 10, height: 40, border: "1px solid #00757e" } :
                                { background: "#00000000", color: "#fff", marginLeft: 10, marginRight: 10, height: 40 }}
                                onClick={() => handleHeaderClick(CONST.SOLUTION)}>
                                Solution
                            </button>

                            <button className="btn" style={headSelected === CONST.ABOUT ?
                                { background: "#fff", color: "#000", marginLeft: 10, marginRight: 10, height: 40, border: "1px solid #00757e" } :
                                { background: "#00000000", color: "#fff", marginLeft: 10, marginRight: 10, height: 40 }}
                                onClick={() => handleHeaderClick(CONST.ABOUT)}>
                                About
                            </button>

                            <button className="btn" style={headSelected === CONST.LOGIN ?
                                { background: "#fff", color: "#000", marginLeft: 10, marginRight: 10, height: 40, border: "1px solid #00757e" } :
                                { background: "#00000000", color: "#fff", marginLeft: 10, marginRight: 10, height: 40 }}
                                onClick={() => handleHeaderClick(CONST.LOGIN)}>
                                Login
                            </button>

                            <button
                                className="btn" style={headSelected === CONST.GET_STARTED ?
                                    { background: "#fff", color: "#000", marginLeft: 10, marginRight: 10, height: 40, border: "1px solid #00757e" } :
                                    { background: "#00000000", color: "#fff", marginLeft: 10, marginRight: 10, height: 40 }}
                                onClick={() => handleHeaderClick(CONST.GET_STARTED)}>
                                Get Started
                            </button>

                        </div>

                    </div>

                    <div className="centerW">

                        <h2 style={{ color: "#0e895f" }}>Private Equity</h2>

                        <h1 style={{ color: "#fff", fontSize: 70 }}>Decision Platform</h1>

                        <h4 style={{ color: "#fff", maxWidth: "60%" }}>Make the right investment decision for your fund Predict, simulate, monitor, explore, and more</h4>

                        <div className="card">
                            <h6 style={{ color: "#0e895f", marginRight: 12 }}>Enter your fund name</h6>

                            <button className="btn" style={{ background: "#0e895f", color: "#0a0c10", height: 40, border: "1px solid #0e895f" }}>
                                Get Started
                            </button>

                        </div>

                        <iframe src='https://my.spline.design/homepage3dnew-595e83ecdaab876f8f9e46d54d920132/' frameBorder='0' width="90%" height="500" title="Spline"></iframe>

                    </div>

                    <div style={{ height: 1, background: "#909193", width: "100%", marginTop: 20, marginBottom: 20 }} />

                </div>

            </div>

        </div>
    )
}

export default WelcomePage