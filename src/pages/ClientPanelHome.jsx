import React from 'react'

export function ClientPanelHome() {
    

    return (
        <>
            <div className="dashboard">
            <h2 className="dashboard-title">Dashboard</h2>
                <div className="info">
                <div className="box userCount">
                    <h1 className="box title">Total Users:</h1>
                </div>
                <div className="box placeholderDiv1">
                <h1 className="box title">Total Users:</h1>
                </div>
                <div className="box placeholderDiv2">
                <h1 className="box title">Total Users:</h1>
                </div>
                <div className="box placeholderDiv3">
                <h1 className="box title">Total Users:</h1>
                </div>
                </div>
                <h2 className="announcements-title">Announcements:</h2>
                <div className="announcements">
                    <div className="announcement1">
                        <h3 className="announcement"></h3>
                    </div>
                    <div className="announcement2">
                        <h3 className="announcement"></h3>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ClientPanelHome