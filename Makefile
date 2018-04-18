dep:
	npm install

test:
	./node_modules/.bin/mocha --reporter spec

 .PHONY: test

push:
	git add .
	@echo $(COMMIT_MESSAGE)
	git commit -m $COMMIT_MESSAGE
	git push
	echo 'Push by '`npm whoami`
	npm publish