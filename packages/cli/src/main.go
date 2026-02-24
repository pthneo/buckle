package main

import (
	"fmt"
	"os"
)

// Defaults
const (
	defaultConfig  = "./buckle.yml"
	defaultPort    = 7260
	pidFile        = ".buckle/buckle.pid"
	logFile        = ".buckle/buckle.log"
)

const (
	INCORRECT_CLI_ARGUMENTS = 1
)

// The version of Buckle
var version = "dev" 

func main() {
	if len(os.Args) < 2 {
		printHelp()
		os.Exit(INCORRECT_CLI_ARGUMENTS)
	}
}

func printHelp() {
	fmt.Print(`
Usage:
	buckle [command]

Available Commands:
	up			Start the Buckle server
	down		Stop the Buckle server (if running in detached mode)

Flags:
	-c, --config <string> 		Path to config file (default: ./buckle.yml)
	-p, --port <int> 					Port to run on (default: 7260)
	-v, --version <string> 		Version of buckle installed
	-h, --help								Help for buckle
	-d, --detach							Run in detached mode
	-o, --open								Open browser automatically
`)
}