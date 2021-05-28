import test from 'ava';

import { validate } from './validate';

const validVins = [
    'JT3Gn87rxW0075238',
    '4A3Ac74H93e017565',
    '2hkrl18621H516782',
    'jn8As58V09W104322',
    '4T4bF3EK3BR285728',
    '3fAfp13p72r127809',
    'sALTw19414a838330',
    'WauBfafl7BN062724',
    'wP1Aa2a22cLA89116',
    '1hGCm66503a025097',
];

test('a 16 digit VIN', (t) => {
    t.false(validate('2C4RDGCG2DR50865'));
});

test('an 18 digit VIN', (t) => {
    t.false(validate('2C4RDGCG2DR5086564'));
});

test('a 17 digit VIN containing I', (t) => {
    t.false(validate('2I4RDGCG2DR508656'));
});

test('a 17 digit VIN containing O', (t) => {
    t.false(validate('2O4RDGCG2DR508656'));
});

test('a 17 digit VIN containing Q', (t) => {
    t.false(validate('2Q4RDGCG2DR508656'));
});

test('a 17 digit VIN containing i', (t) => {
    t.false(validate('2i4rdgcg2dr508656'));
});

test('a 17 digit VIN containing o', (t) => {
    t.false(validate('2o4rdgcg2dr508656'));
});

test('a 17 digit VIN containing q', (t) => {
    t.false(validate('2q4rdgcg2dr508656'));
});

test('a 17 digit VIN with an incorrect check digit', (t) => {
    t.false(validate('2C4RDGCG3DR508656'));
});

test('a null value', (t) => {
    t.false(validate(null));
});

test('an undefined value', (t) => {
    t.false(validate(undefined));
});

test('a valid lowercase VIN', (t) => {
    const valid = validVins.map((vin) => validate(vin.toLowerCase()));
    t.true(valid.every((r) => r === true));
});

test('a valid uppercase VIN', (t) => {
    const valid = validVins.map((vin) => validate(vin.toUpperCase()));
    t.true(valid.every((r) => r === true));
});

test('a valid mixed-case VIN', (t) => {
    const valid = validVins.map((vin) => validate(vin));
    t.true(valid.every((r) => r === true));
});
