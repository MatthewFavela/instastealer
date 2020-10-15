import React from 'react'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'

export const SidebarData = [
    {
        title: 'Home',
        path: '/clientpanelhome',
        icon: <AiIcons.AiFillHome />,
        cName: 'nav-text'
    },
    {
        title: 'Shop',
        path: '/shop',
        icon: <FaIcons.FaShoppingBasket />,
        cName: 'nav-text'
    },
    {
        title: 'Client Panel',
        path: '/clientpanel',
        icon: <FaIcons.FaSolarPanel />,
        cName: 'nav-text'
    },
    
]