import React, { useState } from "react"
import { getUser } from "../../services/common_services"

const SideMenu = ({ activePathName }) => {
    const user = getUser()

    const menuSelected = activePathName;
    const [bottomMenuSelected, setBottomMenuSelected] = useState('');
    const [toggleSubmenu, setToggleSubmenu] = useState(false);
    const [toggleSubmenuFinding, setToggleSubmenuFinding] = useState(false);
    const [toggleLogOut, setToggleLogout] = useState(false);
    const [toggleAIInsight, setToggleAIInsight] = useState(false);
    const [toggleChatBox, setToggleChatBox] = useState(false);
    const [toggleActionsBox, setToggleActionBox] = useState(false);
    const [toggleValuation, setToggleValuation] = useState(false);

    const MENUS = {
        TOP_MENU: ['HOME', 'FUNDRAISING', 'ALLOCATION', 'FINDING', 'STRUCTURING', 'MONITORING', 'ACTIONS', 'PROFILE', 'VALUATION'],
        TOP_MENU_TOGGLE_FUNCTIONS: {
            IS_MONITORING_ACTIVE: toggleSubmenu,
            MONITORING: setToggleSubmenu,
            IS_FINDING_ACTIVE: toggleSubmenuFinding,
            FINDING: setToggleSubmenuFinding,
            ACTIONS: setToggleActionBox,
            IS_ACTIONS_ACTIVE: toggleActionsBox,
            VALUATION: setToggleValuation,
            IS_VALUATION_ACTIVE: toggleValuation
        },
        BOTTOM_MENU: ['AI_INSIGHT', 'CHAT'],
        BOTTOM_MENU_TOGGLE_FUNCTIONS: {
            IS_AI_INSIGHT_ACTIVE: toggleAIInsight,
            AI_INSIGHT: setToggleAIInsight,
            IS_CHAT_ACTIVE: toggleChatBox,
            CHAT: setToggleChatBox
        }
    }

    const onOutsideClick = () => {
        setToggleSubmenu(false);
        setToggleAIInsight(false);
        setToggleChatBox(false);
        setToggleLogout(false);
        setToggleSubmenuFinding(false)
        setToggleActionBox(false);
        setBottomMenuSelected('')
    }

    const HandleMenuClick = (Item) => {
        onOutsideClick();
        if (MENUS.TOP_MENU.includes(Item)) {
            // setMenuSelected(Item);
            MENUS.TOP_MENU_TOGGLE_FUNCTIONS[Item] ?
                MENUS.TOP_MENU_TOGGLE_FUNCTIONS[Item](!MENUS.TOP_MENU_TOGGLE_FUNCTIONS[`IS_${Item}_ACTIVE`]) :
                (function () { return false; }());
        } else {
            (bottomMenuSelected === 'CHAT' || bottomMenuSelected === 'AI_INSIGHT') ? setBottomMenuSelected('') : setBottomMenuSelected(Item);
            MENUS.BOTTOM_MENU_TOGGLE_FUNCTIONS[Item] ?
                MENUS.BOTTOM_MENU_TOGGLE_FUNCTIONS[Item](!MENUS.BOTTOM_MENU_TOGGLE_FUNCTIONS[`IS_${Item}_ACTIVE`]) :
                (function () { return false; }());
        }
    }

    React.useEffect(() => {
        if (document.getElementById('main_section'))
            document.getElementById('main_section').addEventListener('click', onOutsideClick)
        return () => {
            // document.getElementById('main_section').removeEventListener('click',onOutsideClick);
        }
    })

    return (
        <div className='flex-col-1'>
            <div id='az_new-sidebar'>
                <div className='gradient-background'>
                    <div className='menu_dark-bg d-flex flex-column justify-content-between'>
                        <div className='az-top-icons'>
                            <div className='azt-logo text-center' style={{ margin: '20px 0' }}>
                                <img className='logo' src={ic_logo} alt='' />
                            </div>

                            <Link to='/' className={`menu ${menuSelected === 'HOME' ? 'active-menu' : ''}`} onClick={() => HandleMenuClick('HOME')}>
                                <svg className='az_menu-icon' width='20' height='20' viewBox='0 0 20 20'
                                    fill={menuSelected === 'HOME' ? 'var(--darkcolor-primary)' : 'var(--darkwhite)'} xmlns='http://www.w3.org/2000/svg'>
                                    <path d='M2.22222 8.88888H6.66667C7.88889 8.88888 8.88889 7.88889 8.88889 6.66666V2.22222C8.88889 0.999999 7.88889 0 6.66667 0H2.22222C1 0 0 0.999999 0 2.22222V6.66666C0 7.88889 1 8.88888 2.22222 8.88888Z' />
                                    <path d='M2.22222 20H6.66667C7.88889 20 8.88889 19 8.88889 17.7778V13.3333C8.88889 12.1111 7.88889 11.1111 6.66667 11.1111H2.22222C1 11.1111 0 12.1111 0 13.3333V17.7778C0 19 1 20 2.22222 20Z' />
                                    <path d='M11.1111 2.22222V6.66666C11.1111 7.88889 12.1111 8.88888 13.3333 8.88888H17.7778C19 8.88888 20 7.88889 20 6.66666V2.22222C20 0.999999 19 0 17.7778 0H13.3333C12.1111 0 11.1111 0.999999 11.1111 2.22222Z' />
                                    <path d='M13.3332 20H17.7776C18.9999 20 19.9999 19 19.9999 17.7778V13.3333C19.9999 12.1111 18.9999 11.1111 17.7776 11.1111H13.3332C12.111 11.1111 11.111 12.1111 11.111 13.3333V17.7778C11.111 19 12.111 20 13.3332 20Z' />
                                </svg>

                                <div className='place poppins-medium font-white' style={menuSelected === 'HOME' ? { color: 'var(--darkcolor-primary)' } : { color: 'var(--darkwhite)' }}>Home</div>
                            </Link>

                            <div className={`menu ${menuSelected === 'MONITORING' ? 'active-menu' : ''}`} onClick={() => HandleMenuClick('MONITORING')}>
                                <svg className='az_menu-icon' width='22' height='20' viewBox='0 0 22 20' fill={menuSelected === 'MONITORING' ? 'var(--darkcolor-primary)' : 'var(--darkwhite)'} xmlns='http://www.w3.org/2000/svg'>
                                    <path d='M0 11.7791H3.41L8.67778 0L10.12 12.8551L14.0556 6.98709L18.1256 11.7791H22V14.6485H17.1111L14.2633 11.3056L8.45778 20L7.26 9.35438L4.88889 14.6485H0V11.7791Z' />
                                </svg>
                                <div className='place poppins-medium font-white'
                                    style={menuSelected === 'MONITORING' ? { color: 'var(--darkcolor-primary)' } : { color: 'var(--darkwhite)' }}>Monitoring</div>
                            </div>


                            <div className={`menu ${menuSelected === 'FINDING' ? 'active-menu' : ''}`} onClick={() => HandleMenuClick('FINDING')}>
                                <svg className='az_menu-icon' width='20' height='20' viewBox='0 0 20 20'
                                    fill={menuSelected === 'FINDING' ? 'var(--darkcolor-primary)' : 'var(--darkwhite)'} xmlns='http://www.w3.org/2000/svg'>
                                    <path d='M17.74 16.33C19.15 14.6 20 12.4 20 10C20 4.48 15.52 0 10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C12.4 20 14.6 19.15 16.33 17.74C16.6 17.52 16.86 17.28 17.11 17.03C17.14 17 17.16 16.97 17.18 16.95C17.38 16.75 17.57 16.54 17.74 16.33ZM10 18C5.59 18 2 14.41 2 10C2 5.59 5.59 2 10 2C14.41 2 18 5.59 18 10C18 11.85 17.37 13.54 16.31 14.9L14.88 13.47C15.57 12.49 15.98 11.3 15.98 10.01C15.98 6.7 13.29 4.01 9.98 4.01C6.67 4.01 3.98 6.7 3.98 10.01C3.98 13.32 6.67 16.01 9.98 16.01C11.28 16.01 12.49 15.59 13.47 14.88L14.89 16.3C13.54 17.37 11.85 18 10 18ZM11.92 10.51C12.09 9.85 11.94 9.13 11.43 8.61L11.41 8.59C10.64 7.82 9.41 7.81 8.63 8.55C8.62 8.56 8.6 8.57 8.58 8.59C7.8 9.37 7.8 10.64 8.58 11.42L8.6 11.44C9.12 11.95 9.85 12.11 10.51 11.93L12.02 13.44C11.42 13.8 10.73 14.02 9.98 14.02C7.77 14.02 5.98 12.23 5.98 10.02C5.98 7.81 7.77 6.02 9.98 6.02C12.19 6.02 13.98 7.81 13.98 10.02C13.98 10.75 13.77 11.43 13.42 12.02L11.92 10.51Z' />
                                </svg>

                                <div className='place poppins-medium font-white'
                                    style={menuSelected === 'FINDING' ? { color: 'var(--darkcolor-primary)' } : { color: 'var(--darkwhite)' }}>Finding</div>
                            </div>

                            <div className={`menu menu_item_actions ${menuSelected === 'ACTIONS' ? 'active-menu' : ''}`} onClick={() => HandleMenuClick('ACTIONS')}>
                                <svg className='az_menu_ac-icon' width='21' height='22' viewBox='0 0 21 22' fill='none' stroke={menuSelected === 'ACTIONS' ? 'var(--darkcolor-primary)' : 'var(--darkwhite)'} xmlns='http://www.w3.org/2000/svg'>
                                    <path d='M4.63636 11C3.12121 11 1 12.1667 1 14.5C1 17.3 4.48485 18 6 18' strokeWidth='1.5' />
                                    <path d='M15 3C16.5152 3 20 3.8 20 7C20 10.2 17.8788 11 16.3636 11' strokeWidth='1.5' />
                                    <path d='M13 1.25H8C7.0335 1.25 6.25 2.0335 6.25 3V4C6.25 4.9665 7.0335 5.75 8 5.75H13C13.9665 5.75 14.75 4.9665 14.75 4V3C14.75 2.0335 13.9665 1.25 13 1.25Z' strokeWidth='1.5' />
                                    <path d='M13 17.25H8C7.0335 17.25 6.25 18.0335 6.25 19C6.25 19.9665 7.0335 20.75 8 20.75H13C13.9665 20.75 14.75 19.9665 14.75 19C14.75 18.0335 13.9665 17.25 13 17.25Z' strokeWidth='1.5' />
                                    <path d='M10.7465 12.7083C10.5867 12.763 10.4133 12.7631 10.2535 12.7083M10.7465 12.7083H10.2535M10.7465 12.7083L14.21 11.5208M10.7465 12.7083L10.6694 9.26937M10.2535 12.7083L6.78995 11.5208M14.21 11.5208L13.967 10.8121M14.21 11.5208C14.9336 11.2728 14.8787 10.2315 14.1329 10.061M14.1329 10.061L13.9658 10.7919M14.1329 10.061L10.6694 9.26937M10.6694 9.26937C10.558 9.24387 10.4421 9.24387 10.3307 9.26937L6.5 10.5M10.6694 9.26937L6.5 10.5M6.5 10.5C5.75422 10.6705 6.06634 11.2727 6.78995 11.5208M6.78995 11.5208L6.5 11.3911' strokeWidth='1.5' />
                                    <path d='M10.75 13V17' strokeWidth='1.5' />
                                    <path d='M10.75 5V9' strokeWidth='1.5' />
                                </svg>

                                <div className='place poppins-medium font-white'
                                    style={menuSelected === 'ACTIONS' ? { color: 'var(--darkcolor-primary)' } : { color: 'var(--darkwhite)' }}>Actions</div>
                            </div>

                            <Link to='/valuation' className={`menu ${menuSelected === 'VALUATION' ? 'active-menu' : ''}`} onClick={() => HandleMenuClick('VALUATION')}>
                                <svg className='az_menu-icon' width='20' height='26' viewBox='0 0 20 26' fill={menuSelected === 'VALUATION' ? 'var(--darkcolor-primary)' : 'var(--darkwhite)'} xmlns='http://www.w3.org/2000/svg'>
                                    <path fillRule='evenodd' clipRule='evenodd' d='M4.70965 2.22003C4.94704 1.79998 5.38884 1.54075 5.86731 1.54075H7.11059L6.16121 3.22064C6.06479 3.39124 5.98957 3.57084 5.93577 3.75556H3.84185L4.70965 2.22003ZM7.17518 3.75556L8.42688 1.54075H11.3136L12.7117 4.36815L9.9646 11.9074L7.0823 4.98598C7.07199 4.96123 7.06246 4.93627 7.05369 4.91112H10.4762C10.7918 4.91112 11.0476 4.65244 11.0476 4.33334C11.0476 4.01424 10.7918 3.75556 10.4762 3.75556H7.17518ZM13.6865 3.75556L12.5913 1.54075H14.1328C14.6113 1.54075 15.053 1.79998 15.2904 2.22003L16.1582 3.75556H13.6865ZM13.7318 4.91112H15.9637L11.7789 10.2708L13.7318 4.91112ZM6.029 5.4344L7.83937 9.78179L4.03634 4.91112H5.87494C5.90696 5.08901 5.95825 5.2645 6.029 5.4344ZM5.86731 0.385193C4.97871 0.385193 4.15824 0.86662 3.71737 1.64671L2.36103 4.04669L2.16968 4.38527L2.40867 4.69136L9.55155 13.8395L10 14.4139L10.4485 13.8395L17.5914 4.69136L17.8304 4.38527L17.639 4.04669L16.2827 1.64671C15.8418 0.86662 15.0214 0.385193 14.1328 0.385193H11.6667H8.09527H5.86731ZM2.61908 15.3111C1.38301 15.3111 0.380981 16.3243 0.380981 17.5741V22.8704C0.380981 24.1202 1.38301 25.1333 2.61908 25.1333H2.85717C3.76318 25.1333 4.52848 24.5242 4.77435 23.6889H12.9665C13.2816 23.6889 13.5936 23.6281 13.8862 23.5098L15.5636 22.8314C15.8749 22.7055 16.1577 22.517 16.3948 22.2772L18.2808 20.3703C18.469 20.18 18.6256 19.9603 18.7446 19.7196L19.6836 17.8209C20.0034 17.1741 19.878 16.3928 19.3722 15.8815C18.9928 15.4978 18.4535 15.3231 17.9241 15.4122L16.5772 15.6392C15.7956 15.7709 15.1237 16.2727 14.7695 16.9892L14.6426 17.2456C14.4685 17.5977 14.1511 17.8552 13.7735 17.9506L13.3819 18.0496C13.3738 18.0083 13.3648 17.9671 13.3547 17.9261L13.2519 17.5105C13.0038 16.5074 12.1715 15.7616 11.1568 15.6334L9.44043 15.4165C8.77711 15.3326 8.10843 15.5235 7.58643 15.9457L6.35528 16.9416C6.11886 17.1329 5.82512 17.237 5.52235 17.237H4.83252C4.67155 16.1471 3.74187 15.3111 2.61908 15.3111ZM12.9665 22.5333H4.85717V18.3926H5.52235C6.08462 18.3926 6.63015 18.1991 7.06922 17.844L8.30037 16.8481C8.58145 16.6207 8.9415 16.5179 9.29868 16.5631L11.015 16.78C11.5615 16.8491 12.0096 17.2506 12.1432 17.7907L12.2443 18.2H9.04765C8.73206 18.2 8.47622 18.4587 8.47622 18.7778C8.47622 19.0969 8.73206 19.3556 9.04765 19.3556H12.8572H12.9276L12.9957 19.3383L14.0506 19.0717C14.7519 18.8944 15.3416 18.4161 15.6648 17.7624L15.7916 17.506C15.9824 17.1201 16.3442 16.8499 16.765 16.7791L18.1119 16.5521C18.2773 16.5243 18.4457 16.5788 18.5641 16.6986C18.722 16.8582 18.7612 17.1021 18.6613 17.3042L17.7224 19.2028C17.6583 19.3325 17.5739 19.4507 17.4726 19.5532L15.5867 21.4601C15.459 21.5892 15.3067 21.6907 15.1391 21.7585L13.4617 22.4369C13.3042 22.5006 13.1361 22.5333 12.9665 22.5333ZM1.52384 17.5741C1.52384 16.9625 2.01419 16.4667 2.61908 16.4667C3.22396 16.4667 3.71431 16.9625 3.71431 17.5741V17.8148V23.1111C3.71431 23.5898 3.33056 23.9778 2.85717 23.9778H2.61908C2.01419 23.9778 1.52384 23.482 1.52384 22.8704V17.5741Z' />
                                </svg>

                                <div className='place poppins-medium font-white'
                                    style={menuSelected === 'VALUATION' ? { color: 'var(--darkcolor-primary)' } : { color: 'var(--darkwhite)' }}>Valuation</div>
                            </Link>

                        </div>
                        <div className='az-bottom-icons'>
                            <div className={`menu ${bottomMenuSelected === 'AI_INSIGHT' ? 'active-omenu' : ''}`} onClick={() => HandleMenuClick('AI_INSIGHT')}>
                                <svg className='az_menu-icon' width='26' height='14' viewBox='0 0 26 14' fill='var(--darkwhite)' xmlns='http://www.w3.org/2000/svg'>
                                    <path d='M26.0001 2.33333C26.0001 3.61667 24.9364 4.66667 23.6364 4.66667C23.4237 4.66667 23.2228 4.64333 23.0337 4.585L18.8264 8.72667C18.8855 8.91333 18.9092 9.12333 18.9092 9.33333C18.9092 10.6167 17.8455 11.6667 16.5455 11.6667C15.2455 11.6667 14.1819 10.6167 14.1819 9.33333C14.1819 9.12333 14.2055 8.91333 14.2646 8.72667L11.251 5.75167C11.0619 5.81 10.8492 5.83333 10.6364 5.83333C10.4237 5.83333 10.211 5.81 10.0219 5.75167L4.64461 11.0717C4.7037 11.2583 4.72733 11.4567 4.72733 11.6667C4.72733 12.95 3.6637 14 2.3637 14C1.0637 14 6.10352e-05 12.95 6.10352e-05 11.6667C6.10352e-05 10.3833 1.0637 9.33333 2.3637 9.33333C2.57642 9.33333 2.77733 9.35667 2.96642 9.415L8.35551 4.10667C8.29642 3.92 8.27279 3.71 8.27279 3.5C8.27279 2.21667 9.33642 1.16667 10.6364 1.16667C11.9364 1.16667 13.0001 2.21667 13.0001 3.5C13.0001 3.71 12.9764 3.92 12.9173 4.10667L15.931 7.08167C16.1201 7.02333 16.3328 7 16.5455 7C16.7582 7 16.971 7.02333 17.1601 7.08167L21.3555 2.92833C21.2964 2.74167 21.2728 2.54333 21.2728 2.33333C21.2728 1.05 22.3364 0 23.6364 0C24.9364 0 26.0001 1.05 26.0001 2.33333Z' />
                                </svg>

                                <div className='place poppins-medium font-white'
                                    style={{ color: 'var(--darkwhite)' }}>Insight</div>
                            </div>

                            <div className={`menu m-0 ${bottomMenuSelected === 'CHAT' ? 'active-omenu' : ''}`} onClick={() => HandleMenuClick('CHAT')}>
                                <svg className='az_menu-icon' width='26' height='27' viewBox='0 0 26 27' fill='var(--darkwhite)' xmlns='http://www.w3.org/2000/svg'>
                                    <path d='M26.0001 8.56636V19.6364C26.0001 20.9864 24.8301 22.0909 23.4001 22.0909H5.20006L6.10352e-05 27V4.90909C6.10352e-05 3.55909 1.17006 2.45455 2.60006 2.45455H15.7301C15.6521 2.84727 15.6001 3.26455 15.6001 3.68182C15.6001 4.09909 15.6521 4.51636 15.7301 4.90909H2.60006V19.6364H23.4001V9.69545C24.3621 9.51136 25.2461 9.10636 26.0001 8.56636ZM18.2001 3.68182C18.2001 5.71909 19.9421 7.36364 22.1001 7.36364C24.2581 7.36364 26.0001 5.71909 26.0001 3.68182C26.0001 1.64455 24.2581 0 22.1001 0C19.9421 0 18.2001 1.64455 18.2001 3.68182Z' />
                                </svg>

                                <div className='place poppins-medium font-white'
                                    style={{ color: 'var(--darkwhite)' }}>Chat</div>
                            </div>

                            {
                                user.is_admin ?
                                    <Link to='/admin/home'
                                        className={`bottom ${menuSelected === 'PROFILE' ? 'active-menu' : ''}`}
                                        onClick={() => { HandleMenuClick('PROFILE') }}
                                        onContextMenu={(e) => {
                                            e.preventDefault();
                                            onOutsideClick();
                                            setToggleLogout(!toggleLogOut)
                                        }}>
                                        <svg className='bottom-border' width='40' height='2' viewBox='0 0 40 2' fill='none' xmlns='http://www.w3.org/2000/svg'>
                                            <path opacity='0.5' d='M6.10352e-05 1H40.0001' stroke='white' strokeWidth='2' />
                                        </svg>
                                        <img alt='' className='fitObject' src={user.photoURL !== null && user.photoURL !== '' ? user.photoURL : ic_avatar}
                                            onError={ic_avatar}
                                            style={{ height: 44, width: 44, borderRadius: '50%' }} />
                                    </Link> :
                                    <Link to='/profile'
                                        className={`bottom ${menuSelected === 'PROFILE' ? 'active-menu' : ''}`}
                                        // onClick={() => { setToggleLogout(!toggleLogOut) }}
                                        onContextMenu={(e) => {
                                            e.preventDefault();
                                            onOutsideClick();
                                            setToggleLogout(!toggleLogOut)
                                        }}
                                    >
                                        <svg className='bottom-border' width='40' height='2' viewBox='0 0 40 2' fill='none' xmlns='http://www.w3.org/2000/svg'>
                                            <path opacity='0.5' d='M6.10352e-05 1H40.0001' stroke='white' strokeWidth='2' />
                                        </svg>
                                        <img src={user.photoURL !== null && user.photoURL !== '' ? user.photoURL : ic_avatar}
                                            onError={ic_avatar}
                                            style={{ height: 44, width: 44, borderRadius: '50%' }} className='fitObject' alt='' />
                                    </Link>
                            }
                        </div>
                    </div>
                </div>
                {
                    toggleLogOut && (
                        <div className='log__out_menu' onClick={onSignOut}>
                            <div className='lg_m_bd d-flex justify-content-center align-items-center'>
                                <div className='m-0 place poppins-medium font-white' style={{ fontSize: 12 }}>Logout</div>
                            </div>
                            <div id='akpdi_arrow' className='add_kpi_lg-arrow'><div className='blured__part'></div></div>
                        </div>
                    )
                }
                {
                    toggleSubmenu ? <SubMenu handleSubMenuChange={onActiveSubMenuClick} /> : ''
                }
                {
                    toggleSubmenuFinding ? <SubMenuFinding handleSubMenuChange={onActiveSubMenuFindingClick} /> : ''
                }
                {toggleAIInsight && <AIInsights closeMenu={setToggleAIInsight} />}
                {toggleChatBox && <ChatBox closeMenu={setToggleChatBox} />}
                {toggleActionsBox && <ActionsMenu handleSubMenuChange={setToggleActionBox} />}
            </div>
        </div>
    )
}

export default SideMenu