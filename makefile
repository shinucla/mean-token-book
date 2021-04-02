sdktags ::
	find ./backend_nodejs/controller -name "*.js" | xargs etags -a
	find ./backend_nodejs/model -name "*.js" | xargs etags -a
	find ./backend_nodejs/service -name "*.js" | xargs etags -a
	find ./frontend_ng/token-book/src -name "*.scss" \
	-o -name "*.css" \
	-o -name "*.js" \
	-o -name "*.html" | xargs etags -a
