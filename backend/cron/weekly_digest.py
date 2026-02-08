#!/usr/bin/env python3
"""
Weekly Research Digest Cron Job
Sends weekly research digest emails to all subscribers every Monday at 9:00 AM UTC.

Setup crontab:
0 9 * * 1 /usr/bin/python3 /app/backend/cron/weekly_digest.py >> /var/log/weekly_digest.log 2>&1

Or use systemd timer for more reliability.
"""

import os
import sys
import asyncio
import httpx
from datetime import datetime
from pathlib import Path

# Add parent directory to path for imports
sys.path.insert(0, str(Path(__file__).parent.parent))

from dotenv import load_dotenv

# Load environment variables
load_dotenv(Path(__file__).parent.parent / '.env')

# Configuration
API_BASE_URL = os.environ.get('API_BASE_URL', 'http://localhost:8001')
LOG_PREFIX = f"[{datetime.now().isoformat()}] Weekly Digest:"


async def send_weekly_digest():
    """Trigger the weekly digest endpoint"""
    print(f"{LOG_PREFIX} Starting weekly digest job...")
    
    try:
        async with httpx.AsyncClient(timeout=60.0) as client:
            response = await client.post(f"{API_BASE_URL}/api/digest/send-all")
            
            if response.status_code == 200:
                data = response.json()
                print(f"{LOG_PREFIX} SUCCESS - {data.get('message', 'Digest sent')}")
                print(f"{LOG_PREFIX} Sent to {data.get('sent_count', 0)} subscribers")
                return True
            else:
                print(f"{LOG_PREFIX} ERROR - Status {response.status_code}: {response.text}")
                return False
                
    except Exception as e:
        print(f"{LOG_PREFIX} ERROR - {str(e)}")
        return False


def main():
    """Main entry point for cron job"""
    print(f"\n{'='*60}")
    print(f"{LOG_PREFIX} Job triggered")
    print(f"{'='*60}")
    
    success = asyncio.run(send_weekly_digest())
    
    print(f"{LOG_PREFIX} Job completed with status: {'SUCCESS' if success else 'FAILED'}")
    print(f"{'='*60}\n")
    
    sys.exit(0 if success else 1)


if __name__ == "__main__":
    main()
