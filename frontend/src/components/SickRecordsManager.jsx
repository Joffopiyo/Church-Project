import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
    Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem, Grid, Chip
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import axios from 'axios';
import { toast } from 'react-toastify';

function SickRecordsManager() {
    const [records, setRecords] = useState([]);
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        patientName: '',
        condition: '',
        hospital: '',
        admissionDate: '',
        status: 'ADMITTED',
        notes: '',
        documents: []
    });
    const [uploading, setUploading] = useState(false);

    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        fetchRecords();
    }, []);

    const fetchRecords = async () => {
        try {
            const token = user.token;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const response = await axios.get('http://localhost:5000/api/sick-records', config);

            // Fetch signed URLs for documents
            const recordsWithSignedUrls = await Promise.all(
                response.data.map(async (record) => {
                    if (record.documents && record.documents.length > 0) {
                        const documentsWithUrls = await Promise.all(
                            record.documents.map(async (docId) => {
                                try {
                                    const docRes = await axios.get(`http://localhost:5000/api/files/${docId}`, config);
                                    return docRes.data;
                                } catch (error) {
                                    console.error('Error fetching document:', error);
                                    return null;
                                }
                            })
                        );
                        return { ...record, documentsData: documentsWithUrls.filter(d => d !== null) };
                    }
                    return { ...record, documentsData: [] };
                })
            );

            setRecords(recordsWithSignedUrls);
        } catch (error) {
            console.error('Error fetching records:', error);
            toast.error('Failed to fetch sick records');
        }
    };

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setFormData({
            patientName: '',
            condition: '',
            hospital: '',
            admissionDate: '',
            status: 'ADMITTED',
            notes: '',
            documents: []
        });
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileUpload = async (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;

        setUploading(true);
        const uploadedDocs = [];

        try {
            const token = user.token;

            for (const file of files) {
                const formDataUpload = new FormData();
                formDataUpload.append('file', file);

                const config = {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${token}`,
                    },
                };

                const response = await axios.post('http://localhost:5000/api/upload', formDataUpload, config);
                uploadedDocs.push(response.data._id);
            }

            setFormData((prev) => ({
                ...prev,
                documents: [...prev.documents, ...uploadedDocs]
            }));

            toast.success(`${files.length} file(s) uploaded successfully`);
        } catch (error) {
            console.error('Error uploading files:', error);
            toast.error('Failed to upload files');
        } finally {
            setUploading(false);
            e.target.value = null;
        }
    };

    const handleSubmit = async () => {
        try {
            const token = user.token;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            await axios.post('http://localhost:5000/api/sick-records', formData, config);
            toast.success('Sick record added successfully');
            fetchRecords();
            handleClose();
        } catch (error) {
            console.error('Error adding record:', error);
            toast.error('Failed to add sick record');
        }
    };

    return (
        <Box sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h4" component="h1">
                    Sick Records
                </Typography>
                <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpen}>
                    Add New Record
                </Button>
            </Box>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Patient Name</TableCell>
                            <TableCell>Condition</TableCell>
                            <TableCell>Hospital</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Documents</TableCell>
                            <TableCell>Admission Date</TableCell>
                            <TableCell>Reported By</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {records.map((record) => (
                            <TableRow key={record._id}>
                                <TableCell>{record.patientName}</TableCell>
                                <TableCell>{record.condition}</TableCell>
                                <TableCell>{record.hospital}</TableCell>
                                <TableCell>
                                    <Chip
                                        label={record.status}
                                        color={record.status === 'CRITICAL' ? 'error' : record.status === 'DISCHARGED' ? 'success' : 'warning'}
                                        size="small"
                                    />
                                </TableCell>
                                <TableCell>
                                    {record.documentsData && record.documentsData.length > 0 ? (
                                        <Box>
                                            {record.documentsData.map((doc) => (
                                                <Box key={doc._id} sx={{ mb: 0.5 }}>
                                                    <a
                                                        href={doc.signedUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        style={{ fontSize: '0.875rem' }}
                                                    >
                                                        {doc.originalName}
                                                    </a>
                                                </Box>
                                            ))}
                                        </Box>
                                    ) : '-'}
                                </TableCell>
                                <TableCell>{new Date(record.admissionDate).toLocaleDateString()}</TableCell>
                                <TableCell>{record.reportedBy?.firstName} {record.reportedBy?.lastName}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
                <DialogTitle>Add Sick Record</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2} sx={{ mt: 1 }}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Patient Name"
                                name="patientName"
                                value={formData.patientName}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Condition"
                                name="condition"
                                value={formData.condition}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Hospital"
                                name="hospital"
                                value={formData.hospital}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                type="date"
                                label="Admission Date"
                                name="admissionDate"
                                InputLabelProps={{ shrink: true }}
                                value={formData.admissionDate}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                select
                                label="Status"
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                            >
                                <MenuItem value="ADMITTED">Admitted</MenuItem>
                                <MenuItem value="DISCHARGED">Discharged</MenuItem>
                                <MenuItem value="RECOVERING">Recovering</MenuItem>
                                <MenuItem value="CRITICAL">Critical</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="subtitle2" gutterBottom>
                                Upload Documents (Images, Videos, PDFs)
                            </Typography>
                            <input
                                accept="image/*,video/*,.pdf,.doc,.docx"
                                type="file"
                                multiple
                                onChange={handleFileUpload}
                                disabled={uploading}
                                style={{ width: '100%' }}
                            />
                            {uploading && <Typography variant="caption" color="primary">Uploading...</Typography>}
                            {formData.documents.length > 0 && (
                                <Typography variant="caption" color="success.main">
                                    {formData.documents.length} file(s) uploaded
                                </Typography>
                            )}
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                multiline
                                rows={3}
                                label="Notes"
                                name="notes"
                                value={formData.notes}
                                onChange={handleChange}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit} variant="contained">Save</Button>
                </DialogActions>
            </Dialog>
        </Box >
    );
}

export default SickRecordsManager;
