import React, {useState, useEffect } from 'react';
import {
    CircularProgress,
    Snackbar,
    Box,
    TextField,
    Checkbox,
    IconButton,
    } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { red, green } from '@mui/material/colors';

// Own
import useItem from '../../hooks/item/useItem.ts';
import useChangeItem from '../../hooks/item/useChangeItem.ts';
import { UpdateItem } from '../../models/item.ts';
import DeleteItem from './DeleteItem.tsx';


interface ItemComponentProps{
    id: string,
    shoppingListId: string;
}

const ItemComponent: React.FC<ItemComponentProps> = ({id, shoppingListId}) => {
    const {data: itemData, isLoading: itemLoading, isError: itemError, refetch } = useItem(id)
    const {mutate} = useChangeItem();

    const [itemName, setItemName] = useState<string>('');
    const [amount, setAmount] = useState<number>(1);
    const [done, setDone] = useState<boolean>(false);
    const [saveRequired, setSaveRequired] = useState(false);

    useEffect(() => {
        if (itemData) {
            setItemName(itemData.name);
            setAmount(itemData.amount);
            setDone(itemData.done);
        }
    }, [itemData]);

    const doneLabel = { inputProps: { 'aria-label': 'Checkbox demo' } };

    const handleSave = () => {
        const itemUpdate: UpdateItem = {
            shopping_list_id: shoppingListId,
            id: id,
            name: itemName,
            amount: amount,
            done: done
        }
        mutate({id: id, item: itemUpdate}, {
            onSuccess: () => {
                refetch();
            }
        });
        setSaveRequired(false); 
    };

    if (itemLoading) {
        return <CircularProgress/>
    }

    if (itemError) {
        return <Snackbar  message='Faild to load item'/>
    }
    
    if (itemData === undefined){
        return <Snackbar  message='Item ist not Correct'/>
    }

    const handleNameChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setItemName(event.target.value);
        setSaveRequired(true);
    };

    const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(Number(event.target.value));
        setSaveRequired(true);
    };

    const handleDoneChage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDone(event.target.checked);
        setSaveRequired(true);
    };
    
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 2,
                marginTop: 2,
                }}
            >
                <Checkbox
                    {...doneLabel}
                    checked={done}
                    onChange={handleDoneChage}
                />
                <TextField 
                    id="outlined" 
                    size="small" 
                    label="Name"
                    value={itemName} 
                    onChange={handleNameChange}
                />
                <TextField
                    id="outlined-amount"
                    size="small"
                    label="Amount"
                    variant="outlined"
                    type="number"
                    value={amount}
                    style={{ flex: 0.7 }}
                    onChange={handleAmountChange}
                />

                <IconButton 
                    aria-label="delete" 
                    size="small" 
                    sx={{
                        color: saveRequired ? red[500] : green[500],
                    }} 
                    onClick={handleSave}>
                    <SaveIcon/>
                </IconButton>

                <DeleteItem id={id} shoppingListId={shoppingListId}/>
        </Box>
    )
}

export default ItemComponent;