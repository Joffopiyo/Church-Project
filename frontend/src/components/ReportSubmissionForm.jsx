import { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { TextField, Button, Box, Typography, Paper, MenuItem, CircularProgress } from '@mui/material';
import { toast } from 'react-toastify';

function ReportSubmissionForm() {
    const { user } = useSelector((state) => state.auth);
    const [formData, setFormData] = useState({
        department: user?.department || '',
        periodStart: '',
        periodEnd: '',
        type: 'WEEKLY',
        attendanceCount: 0,
        attendanceList: '',
        summary: '',
    });
    const [files, setFiles] = useState([]);
    const [uploading, setUploading] = useState(false);

    const { department, periodStart, periodEnd, type, attendanceCount, attendanceList, summary } = formData;

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onFileChange = (e) => {
        setFiles(e.target.files);
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        if (!department) {
            toast.error('Department ID is required');
            return;
        }

        try {
            setUploading(true);
            const uploadedFileIds = [];

            if (files.length > 0) {
                for (let i = 0; i < files.length; i++) {
                    const file = files[i];
                    const formData = new FormData();
                    formData.append('file', file);

                    const config = {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            Authorization: `Bearer ${user.token}`,
                        },
                    };

                    const { data } = await axios.post('/api/upload', formData, config);
                    uploadedFileIds.push(data._id);
                }
            }

            const reportData = {
                ...formData,
                media: uploadedFileIds,
                attendanceList: attendanceList ? attendanceList.split(',').map(name => name.trim()) : []
            };

            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };

            await axios.post('/api/reports', reportData, config);
            toast.success('Report submitted successfully');
            setFormData({
                department: user?.department || '',
                periodStart: '',
                periodEnd: '',
                type: 'WEEKLY',
                attendanceCount: 0,
                attendanceList: '',
                summary: '',
            });
            setFiles([]);
        } catch (error) {
            const message = error.response?.data?.message || error.message;
            toast.error(message);
        } finally {
            setUploading(false);
        }
    };

    return (
        <Paper elevation={2} sx={{ p: 2, mt: 2 }}>
            <Typography variant="h6" gutterBottom>
                Submit Department Report
            </Typography>
            <Box component="form" onSubmit={onSubmit}>
                <TextField
                    name="department"
                    label="Department ID"
                    fullWidth
                    margin="normal"
                    value={department}
                    onChange={onChange}
                    required
                    helperText="Enter your Department ID"
                />
                <TextField
                    name="type"
                    select
                    label="Report Type"
                    fullWidth
                    margin="normal"
                    value={type}
                    onChange={onChange}
                >
                    <MenuItem value="WEEKLY">Weekly</MenuItem>
                    <MenuItem value="MONTHLY">Monthly</MenuItem>
                    <MenuItem value="EVENT">Event</MenuItem>
                </TextField>
                <TextField
                    name="periodStart"
                    label="Period Start"
                    type="date"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                    value={periodStart}
                    onChange={onChange}
                    required
                />
                <TextField
                    name="periodEnd"
                    label="Period End"
                    type="date"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                    value={periodEnd}
                    onChange={onChange}
                    required
                />
                <TextField
                    name="attendanceCount"
                    label="Total Attendance"
                    type="number"
                    fullWidth
                    margin="normal"
                    value={attendanceCount}
                    onChange={onChange}
                />
                <TextField
                    name="attendanceList"
                    label="Attendance Names (Comma separated)"
                    fullWidth
                    margin="normal"
                    multiline
                    rows={2}
                    value={attendanceList}
                    onChange={onChange}
                    helperText="e.g. John Doe, Jane Smith..."
                />
                <TextField
                    name="summary"
                    label="Summary / Highlights"
                    fullWidth
                    margin="normal"
                    multiline
                    rows={4}
                    value={summary}
                    onChange={onChange}
                    required
                />

                <Box sx={{ mt: 2, mb: 2 }}>
                    <Typography variant="subtitle2" gutterBottom>
                        Upload Photos/Documents
                    </Typography>
                    <input
                        type="file"
                        multiple
                        onChange={onFileChange}
                        accept="image/*,.pdf,.doc,.docx"
                    />
                </Box>

                <Button
                    type="submit"
                    variant="contained"
                    sx={{ mt: 2 }}
                    disabled={uploading}
                >
                    {uploading ? <CircularProgress size={24} /> : 'Submit Report'}
                </Button>
            </Box>
        </Paper>
    );
}

export default ReportSubmissionForm;
