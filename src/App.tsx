import * as React from 'react';
import {observer} from 'mobx-react-lite';
import { Provider, AppState } from './AppState/AppState';
import { MainPage } from './MainPage/MainPage';

const appStore = new AppState();

export const App = observer(() => {
    return (
        <Provider value={appStore}>
            <MainPage />
        </Provider>
    );
});
