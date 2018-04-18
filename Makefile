dep:
	npm install

test:
	./node_modules/.bin/mocha --reporter spec

 .PHONY: test

push:
	echo 'Push by '`npm whoami`
	npm publish