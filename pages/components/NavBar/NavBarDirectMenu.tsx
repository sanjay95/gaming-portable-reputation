import React from 'react'
import { useRouter } from 'next/router'
import afflogo from '../../../assets/images/Affinidi_darkBG_Sq.png'
import { ROUTES } from 'utils'
import * as S from './NavBar.styled'
import { useNavBar } from './useNavBar'

export default function NavBarDirectMenu() {
    const { isMenuOpen, setIsMenuOpen, isAuthorized, handleLogOut } = useNavBar()
    const navigate = useRouter()

    const redirect = (e: any, path: string) => {
        e.preventDefault()
        navigate.push(path)
        return false
    }
    const logout = (e: any) => {
        handleLogOut()
        return false
    }
    const anchorStyle = {
        margin: '0px',
        boxSizing: 'border-box',
        display: 'block',
        textDecoration: 'none',
        padding: '12px 25px',
        textTransform: 'uppercase',
        fontSize: '1.6rem',
        fontWeight: 600,
        cursor: 'pointer',
        color: 'hsla(0, 0%, 100%, 1)',
    } as React.CSSProperties
    const headerStyle = {
        margin: '0px',
        boxSizing: 'border-box',
        padding: '10px 12px',
        position: 'fixed',
        top: '0px',
        left: '0px',
        width: '100%',
        backgroundColor: 'hsla(240, 63%, 13%, 1)',
        zIndex: 4,
        font: "auto"
    } as React.CSSProperties

    return (
        <>
            <header
                className='header'
                style={headerStyle}
            >
                <div
                    className='container'
                    style={{
                        margin: '0px',
                        padding: '0px',
                        boxSizing: 'border-box',
                        paddingInline: '12px',
                        marginInline: 'auto',
                        width: '100%',
                        maxWidth: '1140px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <a
                        className='logo'
                        onClick={(e) => { redirect(e, ROUTES.home) }}
                        style={{
                            margin: '0px',
                            padding: '0px',
                            boxSizing: 'border-box',
                            display: 'block',
                            textDecoration: 'none',
                            color: 'inherit',
                        }}
                    >
                        <img
                            height={80}
                            width={100}
                            alt='unigine home'
                            src={afflogo.src}
                            style={{
                                margin: '0px',
                                padding: '0px',
                                boxSizing: 'border-box',
                                display: 'block',
                                height: 'auto',
                                width: '80px',
                            }}
                        />
                    </a>
                    <nav
                        className='navbar'
                        style={{
                            top: 'calc(100% - 1px)',
                            right: '12px',
                            left: '12px',
                            backgroundColor: 'hsla(240, 63%, 13%, 1)',
                            color: 'hsla(0, 0%, 100%, 1)',
                            display: 'block',


                        }}
                    >
                        <ul
                            className='navbar-list'
                            style={{
                                margin: '0px',
                                padding: '0px',
                                boxSizing: 'border-box',
                                display: 'flex',
                            }}
                        >
                            <li
                                className='navbar-item'
                                style={{
                                    margin: '0px',
                                    padding: '0px',
                                    boxSizing: 'border-box',
                                    listStyle: 'none',
                                    borderBlockStart: '1px solid hsl(240, 45%, 17%)',
                                    border: 'none',
                                }}
                            >
                                <a
                                    className='navbar-link'
                                    onClick={(e) => { redirect(e, ROUTES.home) }}
                                    style={anchorStyle}
                                >
                                    home
                                </a>
                            </li>
                            
                         

                            <li
                                className='navbar-item'
                                style={{
                                    margin: '0px',
                                    padding: '0px',
                                    boxSizing: 'border-box',
                                    listStyle: 'none',
                                    borderBlockStart: '1px solid hsl(240, 45%, 17%)',
                                    border: 'none',
                                }}
                            >
                                <a
                                    className='navbar-link'
                                    onClick={(e) => { redirect(e, ROUTES.game1) }}
                                    style={anchorStyle}
                                >
                                    Board tennis
                                </a>
                            </li>
                            <li
                                className='navbar-item'
                                style={{
                                    margin: '0px',
                                    padding: '0px',
                                    boxSizing: 'border-box',
                                    listStyle: 'none',
                                    borderBlockStart: '1px solid hsl(240, 45%, 17%)',
                                    border: 'none',
                                }}
                            >
                                <a
                                    className='navbar-link'
                                    onClick={(e) => { redirect(e, ROUTES.game2)}}
                                    style={anchorStyle}
                                >
                                    screen tennis
                                </a>
                            </li>
                            
                            <li
                                className='navbar-item'
                                onClick={(e) => { redirect(e, ROUTES.tournament) }}
                                style={{
                                    margin: '0px',
                                    padding: '0px',
                                    boxSizing: 'border-box',
                                    listStyle: 'none',
                                    borderBlockStart: '1px solid hsl(240, 45%, 17%)',
                                    border: 'none',
                                }}
                            >
                                <a
                                    className='navbar-link'
                                    href='/'
                                    style={anchorStyle}
                                >
                                    tournament
                                </a>
                            </li>
                         
                            <li
                                className='navbar-item'
                                style={{
                                    margin: '0px',
                                    padding: '0px',
                                    boxSizing: 'border-box',
                                    listStyle: 'none',
                                    borderBlockStart: '1px solid hsl(240, 45%, 17%)',
                                    borderBlockEnd: '1px solid hsl(240, 45%, 17%)',
                                    border: 'none',
                                }}
                            >
                                <a
                                    className='navbar-link'
                                    onClick={(e) => { redirect(e, ROUTES.contact) }}
                                    style={anchorStyle}
                                >
                                    contact
                                </a>
                            </li>
                        </ul>
                    </nav>
                    {isAuthorized && <li
                                className='navbar-item'
                                style={{
                                    margin: '0px',
                                    padding: '0px',
                                    boxSizing: 'border-box',
                                    listStyle: 'none',
                                    borderBlockStart: '1px solid hsl(240, 45%, 17%)',
                                    borderBlockEnd: '1px solid hsl(240, 45%, 17%)',
                                    border: 'none',
                                }}
                            >
                                <a
                                    className='navbar-link'
                                    onClick={(e) => { redirect(e, ROUTES.wallet) }}
                                    style={anchorStyle}
                                >
                                    Credentials Wallet
                                </a>
                            </li>}

                    {!isAuthorized ? (
                        <>
                            <div
                                className='btn'
                                onClick={(e) => { redirect(e, ROUTES.singIn) }}
                                style={{
                                    margin: '0px',
                                    padding: '0px',
                                    boxSizing: 'border-box',
                                    textDecoration: 'none',
                                    placeItems: 'center',
                                    cursor: 'pointer',
                                    paddingInline: '30px',
                                    overflow: 'hidden',
                                    position: 'relative',
                                    backgroundImage:
                                        'linear-gradient(to right bottom, hsl(299, 100%, 52%), hsl(291, 100%, 58%), hsl(283, 100%, 60%), hsl(273, 100%, 62%), hsl(262, 100%, 63%), hsl(242, 100%, 69%), hsl(223, 100%, 62%), hsl(210, 100%, 50%), hsl(203, 100%, 50%), hsl(198, 100%, 50%), hsl(192, 100%, 48%), hsl(185, 90%, 48%))',
                                    color: 'hsla(0, 0%, 100%, 1)',
                                    fontSize: '1.5rem',
                                    fontWeight: 600,
                                    maxWidth: 'max-content',
                                    minWidth: '180px',
                                    height: '50px',
                                    clipPath: 'polygon(0% 0%, 90% 0, 100% 30%, 100% 100%, 0 100%)',
                                    display: 'grid',
                                    textAlign: 'center',
                                }}
                            >
                                JOIN OUR TEAM
                            </div>
                            <button
                                className='nav-toggle-btn'
                                aria-label='toggle menu'
                                style={{
                                    margin: '0px',
                                    padding: '0px',
                                    boxSizing: 'border-box',
                                    background: 'none',
                                    border: 'none',
                                    font: 'inherit',
                                    cursor: 'pointer',
                                    display: 'none',
                                }}
                            >
                                <span
                                    className='line line-1'
                                    style={{
                                        margin: '0px',
                                        padding: '0px',
                                        boxSizing: 'border-box',
                                        display: 'block',
                                        marginBlock: '4px',
                                        borderRadius: '8px',
                                        transition: '250ms ease',
                                        height: '3px',
                                        width: '10px',
                                        backgroundColor: 'hsla(0, 0%, 87%, 1)',
                                    }}
                                />
                                <span
                                    className='line line-2'
                                    style={{
                                        margin: '0px',
                                        padding: '0px',
                                        boxSizing: 'border-box',
                                        display: 'block',
                                        marginBlock: '4px',
                                        borderRadius: '8px',
                                        transition: '250ms ease',
                                        height: '3px',
                                        backgroundColor: 'hsla(0, 0%, 87%, 1)',
                                        width: '20px',
                                    }}
                                />
                                <span
                                    className='line line-3'
                                    style={{
                                        margin: '0px',
                                        padding: '0px',
                                        boxSizing: 'border-box',
                                        display: 'block',
                                        marginBlock: '4px',
                                        borderRadius: '8px',
                                        transition: '250ms ease',
                                        height: '3px',
                                        width: '10px',
                                        backgroundColor: 'hsla(0, 0%, 87%, 1)',
                                        marginInlineStart: 'auto',
                                    }}
                                />
                            </button>
                        </>
                    ) :
                        (
                            <>
                                <div
                                    className='btn'
                                    onClick={(e) => { logout(e) }}
                                    style={{
                                        margin: '0px',
                                        padding: '0px',
                                        boxSizing: 'border-box',
                                        textDecoration: 'none',
                                        placeItems: 'center',
                                        cursor: 'pointer',
                                        paddingInline: '30px',
                                        overflow: 'hidden',
                                        position: 'relative',
                                        backgroundImage:
                                            'linear-gradient(to right bottom, hsl(299, 100%, 52%), hsl(291, 100%, 58%), hsl(283, 100%, 60%), hsl(273, 100%, 62%), hsl(262, 100%, 63%), hsl(242, 100%, 69%), hsl(223, 100%, 62%), hsl(210, 100%, 50%), hsl(203, 100%, 50%), hsl(198, 100%, 50%), hsl(192, 100%, 48%), hsl(185, 90%, 48%))',
                                        color: 'hsla(0, 0%, 100%, 1)',
                                        fontSize: '1.5rem',
                                        fontWeight: 600,
                                        maxWidth: 'max-content',
                                        minWidth: '180px',
                                        height: '50px',
                                        clipPath: 'polygon(0% 0%, 90% 0, 100% 30%, 100% 100%, 0 100%)',
                                        display: 'grid',
                                        textAlign: 'center',
                                    }}
                                >
                                    LOGOUT
                                </div>
                                <button
                                    className='nav-toggle-btn'
                                    aria-label='toggle menu'
                                    style={{
                                        margin: '0px',
                                        padding: '0px',
                                        boxSizing: 'border-box',
                                        background: 'none',
                                        border: 'none',
                                        font: 'inherit',
                                        cursor: 'pointer',
                                        display: 'none',
                                    }}
                                >
                                    <span
                                        className='line line-1'
                                        style={{
                                            margin: '0px',
                                            padding: '0px',
                                            boxSizing: 'border-box',
                                            display: 'block',
                                            marginBlock: '4px',
                                            borderRadius: '8px',
                                            transition: '250ms ease',
                                            height: '3px',
                                            width: '10px',
                                            backgroundColor: 'hsla(0, 0%, 87%, 1)',
                                        }}
                                    />
                                    <span
                                        className='line line-2'
                                        style={{
                                            margin: '0px',
                                            padding: '0px',
                                            boxSizing: 'border-box',
                                            display: 'block',
                                            marginBlock: '4px',
                                            borderRadius: '8px',
                                            transition: '250ms ease',
                                            height: '3px',
                                            backgroundColor: 'hsla(0, 0%, 87%, 1)',
                                            width: '20px',
                                        }}
                                    />
                                    <span
                                        className='line line-3'
                                        style={{
                                            margin: '0px',
                                            padding: '0px',
                                            boxSizing: 'border-box',
                                            display: 'block',
                                            marginBlock: '4px',
                                            borderRadius: '8px',
                                            transition: '250ms ease',
                                            height: '3px',
                                            width: '10px',
                                            backgroundColor: 'hsla(0, 0%, 87%, 1)',
                                            marginInlineStart: 'auto',
                                        }}
                                    />
                                </button>
                            </>
                        )
                    }


                </div>
            </header>
            
        </>
    )
}
