import * as React from 'react';
import { observer } from "mobx-react";
import { action, observable } from "mobx";
import {Column, ColumnText, BoxImg, DetailsContainer, Spinner, SmallTitle} from "./appStyles.style";

interface ResponseItemType {
    name: string
}

interface DetailsPropsType {
    details: string  | null
}

class DetailsState {
    @observable detailedItemApi: string = `https://pokeapi.co/api/v2/pokemon/` + `${this.props.details}` +`/`;
    @observable results3: Array<ResponseItemType> = [];
    @observable isLoading: boolean | undefined = true;
    @observable imageFront: string = '';
    @observable imageBack: string = '';
    @observable weight: string = '';
    @observable baseEx: string = '';

    constructor(private readonly props: DetailsPropsType) {}

    @action async getDetails() {
        const response2 = await fetch(this.detailedItemApi);
        const respJson = await response2.json();
        this.results3 = respJson;
        this.imageFront = respJson.sprites.front_default;
        this.imageBack = respJson.sprites.back_default;
        this.weight = respJson.weight;
        this.baseEx = respJson.base_experience;
        this.isLoading = false;
    }
}

export const Details = observer((props: DetailsPropsType) => {

    const [state] = React.useState( () => new DetailsState(props) )

    React.useEffect( () => {
        state.getDetails();
    }, []);

    const renderDetails = () => {
        return (
            <DetailsContainer>
                <Column>
                    <SmallTitle>Front</SmallTitle>
                    <BoxImg src={state.imageFront}/>
                    <ColumnText>Mass: {state.weight} kg</ColumnText>
                </Column>
                <Column>
                    <SmallTitle>Back</SmallTitle>
                    <BoxImg src={state.imageBack}/>
                    <ColumnText>Base experience: {state.baseEx}</ColumnText>
                </Column>
                { state.isLoading && <Spinner /> }
            </DetailsContainer>
        )
    }
    return renderDetails();

});
