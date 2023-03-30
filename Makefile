gendiff:
	node bin/gendiff.js
install:	#Установка пакетов
	npm ci

link:		#Линк пакетов
	sudo npm link

publish:	#Проверка публикации
	npm publish --dry-run

lint:		#Проверка линтером
	npx eslint .

test: #Запуск тестов Jest
	NODE_OPTIONS=--experimental-vm-modules npx jest

test-coverage: #Запуск теста покрытия тестами
	NODE_OPTIONS=--experimental-vm-modules npx jest --coverage

run:
	gendiff  './_fixtures_/file1.json' './_fixtures_/file2.json' 

run2:
	gendiff  './_fixtures_/file1.yml' './_fixtures_/file2.yml' 