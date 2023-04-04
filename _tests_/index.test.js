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
const plainRecursive = `Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]`;
const jsonRecursive = '[{"name":"common","isChanged":"changed inside","value":[],"children":[{"name":"follow","isChanged":"added","value":[false]},{"name":"setting1","isChanged":"not changed","value":["Value 1"]},{"name":"setting2","isChanged":"deleted","value":[200]},{"name":"setting3","isChanged":"changed","value":[true,null]},{"name":"setting4","isChanged":"added","value":["blah blah"]},{"name":"setting5","isChanged":"added","value":[],"children":[{"name":"key5","isChanged":"not changed","value":["value5"]}]},{"name":"setting6","isChanged":"changed inside","value":[],"children":[{"name":"doge","isChanged":"changed inside","value":[],"children":[{"name":"wow","isChanged":"changed","value":["","so much"]}]},{"name":"key","isChanged":"not changed","value":["value"]},{"name":"ops","isChanged":"added","value":["vops"]}]}]},{"name":"group1","isChanged":"changed inside","value":[],"children":[{"name":"baz","isChanged":"changed","value":["bas","bars"]},{"name":"foo","isChanged":"not changed","value":["bar"]},{"name":"nest","isChanged":"changed","value":["str"],"children":[{"name":"key","isChanged":"not changed","value":["value"]}]}]},{"name":"group2","isChanged":"deleted","value":[],"children":[{"name":"abc","isChanged":"not changed","value":[12345]},{"name":"deep","isChanged":"changed inside","value":[],"children":[{"name":"id","isChanged":"not changed","value":[45]}]}]},{"name":"group3","isChanged":"added","value":[],"children":[{"name":"deep","isChanged":"changed inside","value":[],"children":[{"name":"id","isChanged":"changed inside","value":[],"children":[{"name":"number","isChanged":"not changed","value":[45]}]}]},{"name":"fee","isChanged":"not changed","value":[100500]}]}]';
test('gendiff JSON recursive', () => {
  expect(genDiff('_fixtures_/file1.json', '_fixtures_/file2.json')).toEqual(expectedRecursive);
});

test('gendiff YAML recursive', () => {
  expect(genDiff('_fixtures_/file1.yml', '_fixtures_/file2.yml')).toEqual(expectedRecursive);
});
test('gendiff YAML plain recursive', () => {
  expect(genDiff('_fixtures_/file1hard.yaml', '_fixtures_/file2hard.yml', 'plain')).toEqual(plainRecursive);
});

test('gendiff YAML JSON recursive', () => {
  expect(genDiff('_fixtures_/file1hard.yaml', '_fixtures_/file2hard.yml', 'json')).toEqual(jsonRecursive);
});
