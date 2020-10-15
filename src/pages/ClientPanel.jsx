import React, { useState, useEffect } from 'react'
import fire from '../fire'
import BasicClientPanel from '../components/basic-client-panel/BasicClientPanel'

export function ClientPanel(props) {

    const [currentUser, setCurrentUser] = useState('')

    useEffect(() => {
        fire.auth().onAuthStateChanged((user) => {
            setCurrentUser(user)
            console.log('Current User', currentUser.uid)
        })
    })
    const userEmail = currentUser.email

    const db = fire.firestore().collection("subscriptions")

    const [basicUserIsInDatabase, setBasicUserIsInDatabase] = useState(false)

    db.get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc => {
                if (userEmail === doc.data().email && doc.data().subscription === "basic") {
                    setBasicUserIsInDatabase(true)
                }
            })
        })

    return (
        <div>
            {basicUserIsInDatabase === true &&
            <BasicClientPanel />
            }
        </div>
    )

}

export default ClientPanel