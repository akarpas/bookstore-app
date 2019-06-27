import { compare } from '../../src/utils/compare';

it('sorts an array of books alphabetically', () => {
    const unsorted = [
        { title: 'F', price: 1 },
        { title: 'C', price: 1 },
        { title: 'A', price: 1 },
        { title: 'D', price: 1 }
    ];
    const sorted = [
        { title: 'A', price: 1 },
        { title: 'C', price: 1 },
        { title: 'D', price: 1 },
        { title: 'F', price: 1 }
    ];
    const result = unsorted.sort(compare);
    expect(result).toEqual(sorted);
});

it('sorts an array of genres alphabetically', () => {
    const unsorted = [
        { name: 'B' },
        { name: 'C' },
        { name: 'A' },
        { name: 'D' }
    ];
    const sorted = [{ name: 'A' }, { name: 'B' }, { name: 'C' }, { name: 'D' }];
    const result = unsorted.sort(compare);
    expect(result).toEqual(sorted);
});
