# packages/cli

The Buckle CLI is the command-line tool for managing the Buckle server.

```
Usage:
	buckle [command]

Available Commands:
	up      Start the Buckle server
	down    Stop the Buckle server (if running in detached mode)

Flags:
	-c, --config <string>     Path to config file (default: ./buckle.yml)
	-p, --port <int>          Port to run on (default: 7260)
	-v, --version <string>    Version of buckle installed
	-h, --help	          Help for buckle
	-d, --detach	          Run in detached mode
	-o, --open		  Open browser automatically
```

The CLI is written as a simple Go binary that can be installed and used as a command-line tool. The
npx package calls this binary to run the server when run through npx.

*Important*: Ensure the version number of the CLI is passed to the build command.