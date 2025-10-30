'use client'

import store from '@/components/store/store';
import { Provider } from 'react-redux';

export default function ClientLayoutRedux({ children }) {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    );
}
