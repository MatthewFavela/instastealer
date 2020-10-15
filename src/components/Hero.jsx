import React from 'react'
import Sidebar from './Sidebar'
import {Router, Switch, Route} from 'react-router-dom'
import ClientPanelHome from '../pages/ClientPanelHome'
import ClientPanel from '../pages/ClientPanel'
import Shop from '../pages/Shop'
import BasicCheckout from '../components/checkout-pages/BasicCheckout'
import ProCheckout from '../components/checkout-pages/ProCheckout'
import MemepageCheckout from '../components/checkout-pages/MemepageCheckout'
import UltimateCheckout from '../components/checkout-pages/UltimateCheckout'

export function Hero({handleLogout}) {
    

    return (
        <div>
            <Sidebar />
            <Switch>
                <Route path='/clientpanelhome' exact component={ClientPanelHome}/>
                <Route path='/shop' exact component={Shop}/>
                <Route path='/clientpanel' exact component={ClientPanel}/>
                <Route path='/basic-checkout' exact component={BasicCheckout}/>
                <Route path='/pro-checkout' exact component={ProCheckout}/>
                <Route path='/memepage-checkout' exact component={MemepageCheckout}/>
                <Route path='/ultimate-checkout' exact component={UltimateCheckout}/>
            </Switch>
            <button onClick={handleLogout} className="logout-button">Logout</button>
        </div>
    )
}

export default Hero