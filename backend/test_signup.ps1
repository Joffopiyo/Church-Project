$body = @{
    firstName = "Test"
    lastName = "BishopAPI"
    email = "bishop_api_test@test.com"
    password = "password123"
    role = "BISHOP"
} | ConvertTo-Json

$response = Invoke-RestMethod -Uri "http://localhost:5000/api/auth/register" -Method Post -Body $body -ContentType "application/json"
Write-Output $response
