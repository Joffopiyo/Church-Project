import { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { TextField, Button, Box, Typography, Paper, MenuItem } from '@mui/material';
import { toast } from 'react-toastify';

function AttendanceRollCall() {
    const { user } = useSelector((state) => state.auth);
    const [formData, setFormData] = useState({
        date: new Date().toISOString().split('T')[0],
        type: 'SUNDAY_SERVICE',
        totalMen: 0,
        totalWomen: 0,
        totalChildren: 0,
        notes: '',
    });

    const { date, type, totalMen, totalWomen, totalChildren, notes } = formData;

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };

            await axios.post('/api/attendance', formData, config);
            toast.success('Attendance recorded successfully');
            setFormData({
                date: new Date().toISOString().split('T')[0],
                type: 'SUNDAY_SERVICE',
                totalMen: 0,
                totalWomen: 0,
                totalChildren: 0,
                notes: '',
            });
        } catch (error) {
            const message = error.response?.data?.message || error.message;
            toast.error(message);
        }
    };

    return (
        <Paper elevation={2} sx={{ p: 2, mt: 2 }}>
            <Typography variant="h6" gutterBottom>
                Daily Attendance Roll Call
            </Typography>
            <Box component="form" onSubmit={onSubmit}>
                <TextField
                    name="date"
                    label="Date"
                    type="date"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                    value={date}
                    onChange={onChange}
                    required
                />
                <TextField
                    name="type"
                    select
                    label="Service Type"
                    fullWidth
                    margin="normal"
                    value={type}
                    onChange={onChange}
                >
                    <MenuItem value="SUNDAY_SERVICE">Sunday Service</MenuItem>
                    <MenuItem value="MIDWEEK">Midweek Service</MenuItem>
                    <MenuItem value="SPECIAL">Special Event</MenuItem>
                </TextField>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <TextField
                        name="totalMen"
                        label="Men"
                        type="number"
                        fullWidth
                        margin="normal"
                        value={totalMen}
                        onChange={onChange}
                    />
                    <TextField
                        name="totalWomen"
                        label="Women"
                        type="number"
                        fullWidth
                        margin="normal"
                        value={totalWomen}
                        onChange={onChange}
                    />
                    <TextField
                        name="totalChildren"
                        label="Children"
                        type="number"
                        fullWidth
                        margin="normal"
                        value={totalChildren}
                        onChange={onChange}
                    />
                </Box>
                <TextField
                    name="notes"
                    label="Notes"
                    fullWidth
                    margin="normal"
                    multiline
                    rows={2}
                    value={notes}
                    onChange={onChange}
                />
                <Button type="submit" variant="contained" sx={{ mt: 2 }}>
                    Record Attendance
                </Button>
            </Box>
        </Paper>
    );
}

export default AttendanceRollCall;
