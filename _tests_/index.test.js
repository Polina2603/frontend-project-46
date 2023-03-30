import { test, expect } from '@jest/globals';
import genDiff from '../src/index.js';

const expectedRecursive = `{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`;

test('gendiff JSON recursive', () => {
  expect(genDiff('_fixtures_/file1.json', '_fixtures_/file2.json')).toEqual(expectedRecursive);
});

test('gendiff YAML recursive', () => {
  expect(genDiff('_fixtures_/file1.yml', '_fixtures_/file2.yml')).toEqual(expectedRecursive);
});
