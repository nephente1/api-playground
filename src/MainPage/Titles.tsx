import React from 'react';
import { observer } from "mobx-react";
import { action, observable } from "mobx";
import { Details } from './Details';
import { TitleText, LightLine } from './appStyles.style';

interface ResponseItemType {
    name: string
}

interface TitlesPropsType {
    name: string,
    results: Array<ResponseItemType>
}

class TitlesState {
    @observable isOpen: boolean = false;

    constructor(private readonly props: TitlesPropsType, private readonly name: string) {}

    showDetails = () => {
        this.isOpen = !this.isOpen;
    }

    @action refreshName = () => {
        if (this.props.name !== this.name) {
            this.isOpen = false;
        }
    }
}

export const Titles = observer((props: TitlesPropsType) => {

    const [name, setName] = React.useState('');
    const [state] = React.useState( () => new TitlesState(props, name) );

    React.useEffect( () => {
        setName(props.name)
        state.refreshName();
    },[props])

    return (
        <>
            <div onClick={state.showDetails}>
                <TitleText colors={state.isOpen}>{props.name}</TitleText>
                { state.isOpen && <Details details={props.name} /> }
            </div>
            <LightLine lightColor={state.isOpen} />
        </>
   );

});
