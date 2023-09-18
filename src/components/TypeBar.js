import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Context } from '../App';
import ListGroup from 'react-bootstrap/ListGroup';

export default observer( function TypeBar() {
    const {types, selectedType, setSelectedType} = useContext(Context);

    return (
        <ListGroup>
            {types.map(type =>
                <ListGroup.Item 
                    style={{cursor: 'pointer'}}
                    active={type.id === selectedType.id}
                    onClick={() => setSelectedType(type)}
                    key={type.id}>
                    {type.value}
                </ListGroup.Item>
            )}
        </ListGroup>
    );
});