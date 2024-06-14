import React, {useState} from 'react';
import { useNavigate } from "react-router";
import {
    TextField,
    Fab,
    Box,
    Container,
    Snackbar,
    CircularProgress,
    Typography,
    List,
    ListItem,
    ListItemText,
    IconButton,
    } from '@mui/material';

// Icons
import AddIcon from '@mui/icons-material/Add';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl';

// Own Code
import {CreateList, ListsResponse} from "../../models/list.ts";
import useLists from "../../hooks/list/useLists.ts";
import useAddList from "../../hooks/list/useAddList.ts";
import DeleteList from "./DeleteList.tsx";

const Lists: React.FC = () => {
    const {data: listsData, isLoading: listsLoading, isError: listsError, refetch} = useLists();
    const navigate = useNavigate();
    const [listName, setListName] = useState('')
    const {mutate, isSuccess, isError} = useAddList();


    if (listsLoading) {
        return <CircularProgress/>
    }

    if (listsError) {
        return <Snackbar open={listsError} message='Faild to load list'/>
    }

    const handleAdd = () => {
        const listInput: CreateList = {name: listName}
        mutate(listInput, {
            onSuccess: () => {
               refetch();
            }
        });
        setListName('');
        if (isSuccess) {
            console.log("SUCCESS")
        }
        if (isError) {
            console.log("Error")
        }
    };
  
    const handleListNameChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setListName(event.target.value);
    };

    const {shopping_list} = listsData as ListsResponse;

    return (
        <Container maxWidth="sm">
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 2,
                    marginTop: 3,
                }}
            >
             <Typography variant="h4" color="primary">Your shopping lists:</Typography>
             {shopping_list.length < 0 ? (
                    <Typography variant="body1">No lists available</Typography>
                ) : (
                    <List>
                        {shopping_list.map((list) => (
                                <ListItem key={list.id}>
                                    <ChecklistRtlIcon />
                                    <ListItemText primary={list.name} sx={{marginLeft: 1}} />
                                    <DeleteList id={list.id} onUpdate={() => refetch()} />
                                    <IconButton aria-label="goto" size="small" onClick={() => navigate(`/list/${list.id}`)}>
                                        <ArrowForwardIosIcon fontSize="small" color="secondary"/>
                                    </IconButton>
                                </ListItem>
                        ))}
                    </List>
                )}
                <Box component="form">
                    <TextField 
                        id="outlined" 
                        size="small" 
                        label="Add a new list" 
                        variant="outlined"
                        value={listName} 
                        onChange={handleListNameChange}
                    />
                    <Fab 
                        size="small" 
                        color="primary" 
                        aria-label="add" 
                        sx={{marginLeft: 1}}
                    >
                        <AddIcon onClick={() => handleAdd()}/>
                    </Fab>
                </Box>
            </Box>
        </Container>
    );
};

export default Lists;