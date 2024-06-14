import React, { useState } from "react";
import { 
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    List,
    ListItem,
    ListItemText 
} from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';

// Own 
import useShareList from "../../hooks/list/useShareList.ts";
import useUsers from "../../hooks/user/useUsers.ts";
import { User } from "../../models/user.ts";

interface ShareListProps {
    shoppingListId: string;

}

const ShareList: React.FC<ShareListProps> = ({shoppingListId}) => {
    const [open, setOpen] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    const { data: userListData } = useUsers(searchTerm, !!searchTerm);
    const { mutate } = useShareList();

    const handleShare = () => {
        if (selectedUserId) {
            mutate({listId: shoppingListId, userId: selectedUserId}, {
                onSuccess: () => {
                    setOpen(false);
                    setSelectedUserId(null);
                    setSearchTerm('');
                }
            });
        }
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedUserId(null);
        setSearchTerm('');
    };

    const handleSearchChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    return (
        <>
            <IconButton 
                aria-label="share" 
                size="small" 
                sx={{
                    marginLeft: 2,
                    marginRight: 1
                }} 
                onClick={handleClickOpen}
            >
                <ShareIcon fontSize="small" />
            </IconButton>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Select user</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Search for users"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                    <List>
                        {userListData?.users.map((user: User) => (
                            <ListItem 
                                button 
                                key={user.id} 
                                onClick={() => setSelectedUserId(user.id)}
                                selected={user.id === selectedUserId}
                            >
                                <ListItemText primary={user.name} />
                            </ListItem>
                        ))}
                    </List>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleShare} disabled={!selectedUserId}>Share</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default ShareList;