
BUILDFILE=build.xml
ANT=/opt/libraries/apache/apache-ant-1.9.5/bin/ant

default :: compile

compile ::
	$(ANT) -emacs -f $(BUILDFILE) compile

jar ::
	$(ANT) -emacs -f $(BUILDFILE) jar

clean ::
	$(exp) $(ANT) -emacs clean

run.Test :: jar
	$(exp) $(ANT) -emacs \
	-Dtarget.main=ssh2deploy.Ssh2Deploy \
	run.SpecifiedMain

