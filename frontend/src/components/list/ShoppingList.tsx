import React from 'react';
import { useNavigate } from "react-router";
import { useParams } from 'react-router-dom';
import {
    CircularProgress,
    Snackbar,
    Box,
    Container,
    Typography,
    List,
    ListItem,
    IconButton,
    } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

//Own
import {ItemsFromList} from "../../models/list.ts";
import useList from "../../hooks/list/useList.ts";
import CreateItemForm from '../item/CreateItemForm.tsx';
import ItemComponent from '../item/ItemComponent.tsx';
import ShareList from './ShareList.tsx';

const ShoppingList: React.FC = () => {
    const { id } = useParams()
    const navigate = useNavigate();

    if (id === undefined) {
        return <Snackbar message='The Id is not there.'/>
    }

    const {data: listData, isLoading: listLoading, isError: listError, refetch} = useList(id);
    if (listLoading) {
        return <CircularProgress/>
    }

    if (listError) {
        return <Snackbar open={listError} message='Faild to load list'/>
    }

    const {name, items} = listData as ItemsFromList;

    return (
        <Container maxWidth="sm">
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 2,
                    marginTop: 2,
                }}
            >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 2,
                }}
            >
                <IconButton aria-label="goto" onClick={() => navigate(`/lists`)}>
                    <ArrowBackIosNewIcon color="secondary"/>
                </IconButton>
                
                <Typography variant="h4" color="primary">{name}</Typography>
                
                <ShareList shoppingListId={id} />
            </Box>
            {items.length === 0 ? (
                    <Typography variant="body1">No items at this list. </Typography>
                ) : (
                    <List>
                        {items.map((item) => (
                                <ListItem key={item.id}>
                                        <ItemComponent id={item.id} shoppingListId={id} />
                                </ListItem>
                        ))}
                    </List>
                )}

            <CreateItemForm shopppingListId={id} onUpdate={refetch} />

            </Box>
        </Container>
    )

};

export default ShoppingList;