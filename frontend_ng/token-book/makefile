## make port=4201 serve
serve ::
	ng serve --proxy-config proxy.conf.json --port $(port)
tags ::
	rm -f TAGS;
	find . -path ./backend_nodejs/node_modules -prune -o -name "*.ts" | xargs etags -a
	find . -path ./frontend_ng/token-book/node_modules -prune -o -name "*.scss" \
	-o -name "*.js" \
	-o -name "*.html" | xargs etags -a
