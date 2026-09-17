#!/usr/bin/env python3
"""
Compatibility wrapper for the legacy daily sync entrypoint.
All catalog synchronization now runs through sync-saatchi-catalog-v3.py so the
same source, x1.50 pricing and 1,799,000 TRY ceiling rules are applied everywhere.
"""

import os
import runpy

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TARGET = os.path.join(ROOT, "scripts", "sync-saatchi-catalog-v3.py")

if __name__ == "__main__":
    runpy.run_path(TARGET, run_name="__main__")
