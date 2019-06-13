NPM_BIN=./node_modules/.bin

define TS_NODE
${NPM_BIN}/ts-node \
--files
endef

run:
	${TS_NODE} \
	--project ./tsconfig.json \
	./src/index.ts
