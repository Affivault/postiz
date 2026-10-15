#!/bin/bash
cd "$(dirname "$0")"
./start.sh stop
echo
read -p "Press Enter to close this window"
