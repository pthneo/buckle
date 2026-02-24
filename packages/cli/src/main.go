package main

import (
	"flag"
	"fmt"
	"os"
	"path/filepath"
	"strconv"
	"strings"
)

// Defaults
const (
	defaultConfig  = "./buckle.yml"
	defaultPort    = 7260
	pidFile        = ".buckle/buckle.pid"
	logFile        = ".buckle/buckle.log"
)

const (
	EXIT_SUCCESS = 0
	INCORRECT_CLI_ARGUMENTS = 1
)

// The version of Buckle
var version = "dev" 

func main() {
	if len(os.Args) < 2 {
		printHelp()
		os.Exit(INCORRECT_CLI_ARGUMENTS)
	}

	switch os.Args[1] {
	case "up":
		run(os.Args[2:])
	case "down":
		// TODO: Implement down command
	case "-h", "--help":
		printHelp()
		os.Exit(EXIT_SUCCESS)
	case "-v", "--version":
		fmt.Println("Buckle version: ", version)
		os.Exit(EXIT_SUCCESS)
	default:
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

func run(args []string) {
	fs := flag.NewFlagSet("", flag.ContinueOnError)

	config  := fs.String("config",  defaultConfig, "")
	port    := fs.Int("port",       defaultPort,   "")
	detach  := fs.Bool("detach",    false,         "")
	open    := fs.Bool("open",      false,         "")

	fs.StringVar(config, 	"c", 	defaultConfig, 		"")
	fs.IntVar(port,    		"p", 	defaultPort,    	"")
	fs.BoolVar(detach, 		"d", 	false,          	"")
	fs.BoolVar(open,   		"o", 	false,          	"")

	fs.Usage = printHelp
	fs.Parse(args)
}

func getStateDir() string {
	home, err := os.UserHomeDir()
	if err != nil {
		panic(err)
	}
	dir := filepath.Join(home, ".buckle")
	os.MkdirAll(dir, 0755)
	return dir
}

func getPidFile() string {
	return filepath.Join(getStateDir(), pidFile)
}

func getLogFile() string {
	return filepath.Join(getStateDir(), logFile)
}

func writePid(pid int) error {
	return os.WriteFile(getPidFile(), []byte(strconv.Itoa(pid)), 0644)
}


func getPid() (int, error) {
	data, err := os.ReadFile(getPidFile())
	if err != nil {
		panic(err)
	}
	return strconv.Atoi(strings.TrimSpace(string(data)))
}