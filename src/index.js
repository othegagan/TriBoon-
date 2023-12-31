import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import './assets/css/tailwind.output.css'
import App from './App'
import { SidebarProvider } from './context/SidebarContext'
import { Windmill } from '@windmill/react-ui'
import ThemedSuspense from './components/ThemedSuspense'
import ContextWrapper from '../src/context/ContextWrapper'



ReactDOM.render(

    <SidebarProvider>
        <Suspense fallback={<ThemedSuspense />}>
            <Windmill usePreferences>
                <ContextWrapper>
                    <App />

                </ContextWrapper>
            </Windmill>
        </Suspense>

    </SidebarProvider>
    ,
    document.getElementById('root')
)


