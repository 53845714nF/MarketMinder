import React, { useState} from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import {CircularProgress, IconButton, Snackbar} from "@mui/material";
import { red } from '@mui/material/colors';

// Own 
import useDeleteList from "../../hooks/list/useDeleteList.ts";

interface DeleteListProps {
    id: string;
    onUpdate: () => void;
}

const DeleteList: React.FC<DeleteListProps> = ({id, onUpdate}) => {
    const {mutate, isSuccess, isError} = useDeleteList();
    const [isDeleting, setIsDeleting] = useState(false);


    const handleDelete = () => {
        setIsDeleting(true);
        mutate(id, {
            onSuccess: () => {
                onUpdate();
            }
        });
        if (isSuccess) {
            console.log("Success delting List")
        }

        setIsDeleting(false);
    };

    if(isError) {
        return <Snackbar open={isError} message="Something went wrong" />
    }

    return (
        <IconButton 
            aria-label="delete" 
            size="small" 
            sx={{
                marginLeft: 2,
                marginRight: 1
            }} 
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

export default DeleteList;