import React, {useState} from 'react';
import {
    TextField,
    Fab,
    Box,
    Snackbar,
    Checkbox,
    } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import useAddItem from "../../hooks/item/useAddItem.ts";
import {CreateItem} from "../../models/item.ts";

interface CreateItemProps {
    shopppingListId: string
    onUpdate: () => void;
}

const CreateItemForm: React.FC<CreateItemProps> = ({shopppingListId, onUpdate}) => {
    const {mutate, isSuccess, isError} = useAddItem();

    const [itemName, setItemName] = useState<string>('');
    const [amount, setAmount] = useState<number>(1);
    const [done, setDone] = useState<boolean>(false);

    const doneLabel = { inputProps: { 'aria-label': 'Checkbox demo' } };

    const handleAdd = () => {
        const itemInput: CreateItem = {
            shopping_list_id:shopppingListId,
            name: itemName,
            amount: amount,
            done: done
        }
        
        mutate(itemInput, {
            onSuccess: () => {
                onUpdate();
            }
        });
        
        // reste
        setItemName('');
        setAmount(1);
        setDone(false);
        if (isSuccess) {
            console.log("SUCCESS")
        }
        if (isError) {
            <Snackbar message='Faild to add Item'/>
        }
    };

    const handleNameChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setItemName(event.target.value);
    };

    const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(Number(event.target.value));
    };

    const handleDoneChage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDone(event.target.checked)
    };

    return (
        <Box 
            component="form"
            sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 2,
                marginTop: 10,
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
                variant="outlined"
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
                style={{ flex: 0.5 }}
                onChange={handleAmountChange}
            />

                    
                    <Fab 
                        size="small" 
                        color="primary" 
                        aria-label="add" 
                    >
                        <AddIcon onClick={() => handleAdd()}/>
                    </Fab>
                </Box>
    )
}

export default CreateItemForm;