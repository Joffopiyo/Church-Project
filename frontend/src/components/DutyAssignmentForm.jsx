import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createDuty } from '../features/duties/dutySlice';
import { TextField, Button, Box, Typography, Paper, MenuItem } from '@mui/material';
import { toast } from 'react-toastify';

function DutyAssignmentForm() {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        assignedTo: '', // In a real app, this would be a dropdown of users
        dueDate: '',
        priority: 'MEDIUM',
    });

    const dispatch = useDispatch();

    const { title, description, assignedTo, dueDate, priority } = formData;

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (!assignedTo) {
            toast.error('Please enter a User ID to assign to (Temporary)');
            return;
        }
        dispatch(createDuty(formData))
            .unwrap()
            .then(() => {
                toast.success('Duty assigned successfully');
                setFormData({
                    title: '',
                    description: '',
                    assignedTo: '',
                    dueDate: '',
                    priority: 'MEDIUM',
                });
            })
            .catch((err) => toast.error(err));
    };

    return (
        <Paper elevation={2} sx={{ p: 2, mt: 2 }}>
            <Typography variant="h6" gutterBottom>
                Assign New Duty
            </Typography>
            <Box component="form" onSubmit={onSubmit}>
                <TextField
                    name="title"
                    label="Title"
                    fullWidth
                    margin="normal"
                    value={title}
                    onChange={onChange}
                    required
                />
                <TextField
                    name="description"
                    label="Description"
                    fullWidth
                    margin="normal"
                    multiline
                    rows={2}
                    value={description}
                    onChange={onChange}
                />
                <TextField
                    name="assignedTo"
                    label="Assign To (User ID)"
                    fullWidth
                    margin="normal"
                    value={assignedTo}
                    onChange={onChange}
                    helperText="Enter the User ID of the assignee"
                    required
                />
                <TextField
                    name="dueDate"
                    label="Due Date"
                    type="date"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                    value={dueDate}
                    onChange={onChange}
                />
                <TextField
                    name="priority"
                    select
                    label="Priority"
                    fullWidth
                    margin="normal"
                    value={priority}
                    onChange={onChange}
                >
                    <MenuItem value="LOW">Low</MenuItem>
                    <MenuItem value="MEDIUM">Medium</MenuItem>
                    <MenuItem value="HIGH">High</MenuItem>
                </TextField>
                <Button type="submit" variant="contained" sx={{ mt: 2 }}>
                    Assign Duty
                </Button>
            </Box>
        </Paper>
    );
}

export default DutyAssignmentForm;
