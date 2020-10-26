import React from 'react';
import { observer } from "mobx-react-lite";
import { AppBody, TextInHeader, NamesBox, Header, Spinner, Input, MainTitle, Button } from './appStyles.style';
import { Titles } from './Titles';
import { useAppStateContext } from '../AppState/AppState';
import { ResponseItemType } from '../AppState/MainPageState';


export const MainPage = observer(() => {
    const appState = useAppStateContext();

    React.useEffect(() => {
        appState.mainPageState.loadData();
    },[]);


    const datas: Array<ResponseItemType> = appState.mainPageState.firstTenElements;
    const renderTitles =
        datas.map((el, id) => <Titles name={el.name} results={appState.mainPageState.searchResults} key={id} /> )

    return (
        <AppBody>
            <NamesBox>
                <Header>
                    <div>
                        <MainTitle>Pokemon circus!</MainTitle>
                        <Input type="text" placeholder="type name" onChange={appState.mainPageState.inputHandler} />
                    </div>
                    <div>
                        <TextInHeader>All characters: { appState.mainPageState.searchResults.length}</TextInHeader>
                        <Button onClick={appState.mainPageState.handleClickPrev}>prev</Button >
                        { appState.mainPageState.isButtonVisible && <Button  onClick={ appState.mainPageState.handleClickNext}>next</Button > }
                    </div>
                </Header>
                <div>{ appState.mainPageState.isLoading ? <Spinner /> : renderTitles}</div>
            </NamesBox>
        </AppBody>

    )
})

// *** https://pokeapi.co/
