#!/usr/bin/env python3
from __future__ import annotations

import math
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / 'scripts'))

import update_prices as pricing


def close(actual, expected, tolerance=1e-9):
    if actual is None or not math.isclose(actual, expected, rel_tol=tolerance, abs_tol=tolerance):
        raise AssertionError(f'{actual!r} != {expected!r}')


# Generic marketplace prices keep comma thousands semantics.
close(pricing.parse_number('14,495'), 14495.0)
close(pricing.parse_number('10.499'), 10499.0)

# TRY FX quotes use Turkish decimal comma semantics, including 4+ decimal digits.
close(pricing.parse_fx_rate('48,6730'), 48.6730)
close(pricing.parse_fx_rate('55,9926'), 55.9926)
close(pricing.parse_fx_rate('48.6730'), 48.6730)
close(pricing.parse_fx_rate('₺ 55,9926'), 55.9926)
assert pricing.parse_fx_rate('486730') is None
assert pricing.parse_fx_rate('0,003') is None

# Regression fixture for the exact failure mode: no 10,000x FX inflation.
foreign_price = 14063
fx = pricing.parse_fx_rate('48,6730')
assert fx is not None
base_try = int(round(foreign_price * fx))
final_try = int(round(base_try * pricing.MARKUP_MULTIPLIER))
assert 600_000 <= base_try <= 800_000, base_try
assert 1_500_000 <= final_try <= 2_000_000, final_try
assert final_try < 10_000_000, final_try

print('PRICING_ENGINE_TEST_OK generic_price=14495 fx=48.6730 regression_final_try=', final_try)
