#!/bin/bash
# Weekly Digest Scheduler
# This script can be called by external schedulers (GitHub Actions, AWS EventBridge, etc.)
# or run manually to trigger the weekly digest

API_URL="${API_BASE_URL:-http://localhost:8001}"
TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%SZ")

echo "=============================================="
echo "Weekly Research Digest - $TIMESTAMP"
echo "=============================================="

# Send digest to all subscribers
response=$(curl -s -X POST "$API_URL/api/digest/send-all" \
  -H "Content-Type: application/json")

echo "Response: $response"

# Extract sent count if available
sent_count=$(echo "$response" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('sent_count', 0))" 2>/dev/null || echo "0")

echo "Sent to $sent_count subscribers"
echo "=============================================="
