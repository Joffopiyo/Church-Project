import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getMyDuties, reset } from '../features/duties/dutySlice';
import { List, ListItem, ListItemText, Typography, Paper, Chip, Box } from '@mui/material';

function DutyList() {
    const dispatch = useDispatch();
    const { duties, isLoading, isError, message } = useSelector((state) => state.duties);

    useEffect(() => {
        dispatch(getMyDuties());

        return () => {
            dispatch(reset());
        };
    }, [dispatch]);

    if (isLoading) {
        return <Typography>Loading duties...</Typography>;
    }

    if (isError) {
        return <Typography color="error">{message}</Typography>;
    }

    return (
        <Paper elevation={2} sx={{ p: 2, mt: 2 }}>
            <Typography variant="h6" gutterBottom>
                My Assigned Duties
            </Typography>
            {duties.length === 0 ? (
                <Typography>No duties assigned.</Typography>
            ) : (
                <List>
                    {duties.map((duty) => (
                        <ListItem key={duty._id} divider>
                            <ListItemText
                                primary={duty.title}
                                secondary={
                                    <>
                                        <Typography component="span" variant="body2" color="text.primary">
                                            {duty.description}
                                        </Typography>
                                        <br />
                                        Due: {new Date(duty.dueDate).toLocaleDateString()}
                                    </>
                                }
                            />
                            <Box>
                                <Chip
                                    label={duty.status}
                                    color={duty.status === 'COMPLETED' ? 'success' : duty.status === 'IN_PROGRESS' ? 'warning' : 'default'}
                                    size="small"
                                    sx={{ mr: 1 }}
                                />
                                <Chip
                                    label={duty.priority}
                                    color={duty.priority === 'HIGH' ? 'error' : 'primary'}
                                    variant="outlined"
                                    size="small"
                                />
                            </Box>
                        </ListItem>
                    ))}
                </List>
            )}
        </Paper>
    );
}

export default DutyList;
