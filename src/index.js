import { readFileSync } from 'node:fs';
import path from 'node:path';
// eslint-disable-next-line import/no-extraneous-dependencies
import _ from 'lodash';

const makeString = (arr) => {
  const result = [...arr];
  result.push('}');
  result.unshift('{');
  return result.join('\n');
};

const isObjectEmpty = (obj) => {
  if (Object.keys(obj).length === 0) {
    return true;
  }
  return false;
};

const genDiff = (filepath1, filepath2) => {
  const file1 = JSON.parse(readFileSync(path.resolve('_fixtures_', filepath1)));
  const file2 = JSON.parse(readFileSync(path.resolve('_fixtures_', filepath2)));
  if (isObjectEmpty(file1) && isObjectEmpty(file2)) { // Пограничный случай - пустые объекты
    return 'Files are empty!';
  }
  const keys1 = Object.keys(file1); // Массив ключей первого файла
  const keys2 = Object.keys(file2); // Массив ключей второго файла
  const keys = _.union(keys1, keys2).sort(); // Массив ключей обоих файлов в алфавитном порядке
  const result = keys.reduce((current, key) => {
    if (keys1.includes(key) && !(keys2.includes(key))) {
      current.push(`- ${key}: ${file1[key]}`);
      return current;
    }
    if (!(keys1.includes(key)) && keys2.includes(key)) {
      current.push(`+ ${key}: ${file2[key]}`);
      return current;
    }
    if (file1[key] === file2[key]) { // Если значения по ключу одинаковые
      current.push(`  ${key}: ${file1[key]}`);
      return current;
    }
    current.push(`- ${key}: ${file1[key]}`); // Если значения по ключу разные
    current.push(`+ ${key}: ${file2[key]}`);
    return current;
  }, []);
  return makeString(result);
};

export default genDiff;
