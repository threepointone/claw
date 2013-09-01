
build: 
	browserify -r ./index.js -o build/claw.js -s claw

.PHONY: build

