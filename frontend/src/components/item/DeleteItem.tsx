import React, { useState } from "react";
import { useQueryClient } from 'react-query';
import {
    CircularProgress,
    IconButton,
    Snackbar
    } from "@mui/material";
import { red } from '@mui/material/colors';
import DeleteIcon from "@mui/icons-material/Delete";
    
// Own 
import useDeleteItem from "../../hooks/item/useDeleteItem.ts";

interface DeleteItemProps {
    id: string;
    shoppingListId: string;
}

const DeleteItem: React.FC<DeleteItemProps> = ({id, shoppingListId}) => {
    const {mutate, isSuccess, isError} = useDeleteItem();
    const [isDeleting, setIsDeleting] = useState(false);
    const queryClient = useQueryClient();


    const handleDelete = () => {
        setIsDeleting(true);
        mutate(id, {
            onSuccess: () => {
                queryClient.invalidateQueries(['list', shoppingListId]);
            }
        });
        
        if(isError) {
            setIsDeleting(false);
            return <Snackbar message="Something went wrong" />
        }
        
        if (isSuccess) {
            setIsDeleting(false);
            return <Snackbar message="Deleting Sucssesfull" />
        }
    };

    return (
        <IconButton 
            aria-label="delete" 
            size="small"
            onClick={handleDelete} disabled={isDeleting}>
                {isDeleting ? (
                    <CircularProgress size={24} color="primary"/>
                ) : (
                    <DeleteIcon 
                    fontSize="small" 
                        sx={{ color: red[500]}} 
                    />
                )}
        </IconButton>
    );
};

export default DeleteItem;