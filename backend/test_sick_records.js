const testSickRecords = async () => {
    try {
        // 1. Login as Admin
        const loginRes = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: 'admin@test.com',
                password: 'password123'
            })
        });
        const loginData = await loginRes.json();

        if (!loginRes.ok) throw new Error(loginData.message);

        const token = loginData.token;
        console.log('Login successful, token obtained.');

        // 2. Create Sick Record
        const newRecord = {
            patientName: 'Backend Test Patient',
            condition: 'Testing Fever',
            hospital: 'Test Hospital',
            admissionDate: new Date().toISOString(),
            status: 'ADMITTED',
            notes: 'Created via test script'
        };

        const createRes = await fetch('http://localhost:5000/api/sick-records', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(newRecord)
        });
        const createData = await createRes.json();

        if (!createRes.ok) throw new Error(createData.message);
        console.log('Sick Record created:', createData);

        // 3. Get Sick Records
        const getRes = await fetch('http://localhost:5000/api/sick-records', {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const getData = await getRes.json();

        if (!getRes.ok) throw new Error(getData.message);

        const found = getData.find(r => r.patientName === 'Backend Test Patient');
        if (found) {
            console.log('Verification SUCCESS: Record found in list.');
        } else {
            console.error('Verification FAILED: Record not found in list.');
        }

    } catch (error) {
        console.error('Test Failed:', error);
    }
};

testSickRecords();
