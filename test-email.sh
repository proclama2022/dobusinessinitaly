#!/bin/bash

# Find an available port
PORT=3001
while lsof -i :$PORT > /dev/null; do
  echo "Port $PORT is in use, trying next..."
  PORT=$((PORT+1))
done

echo "Using port $PORT for test"

# Kill any process using the selected port
lsof -ti :$PORT | xargs kill -9 > /dev/null 2>&1

# Start the development server on selected port
PORT=$PORT npm run dev > server.log 2>&1 &
SERVER_PID=$!

echo "Waiting for server to start on port $PORT..."
sleep 10  # Increased wait time for server startup

# Send test form submission
echo -e "\nSending test form submission to port $PORT..."
curl -X POST http://localhost:$PORT/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "service": "accounting",
    "message": "This is a test message",
    "privacy": true
  }'

echo -e "\nWaiting for email processing..."
sleep 5

# Check server logs
echo -e "\nServer logs:"
cat server.log

echo -e "\nChecking for success message:"
if grep -q "Email sent successfully" server.log; then
  echo "✅ Email sent successfully!"
else
  echo "❌ Email sending failed. Check logs above for details."
fi

# Stop the server
kill $SERVER_PID
rm server.log
