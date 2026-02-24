package main

import (
	"flag"
	"fmt"
	"net/http"
	"os"
	"os/exec"
	"path/filepath"
	"runtime"
	"strconv"
	"strings"
	"syscall"
	"time"
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
	BUCKLE_ALREADY_RUNNING = 2
	FAILED_TO_START_SERVER = 3
)

// The version of Buckle
var version = "dev" 

/*
 * Main entry point for the CLI.
 */
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

/*
 * Parse the flags and run the server.
 */
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

	if pid, err := getPid(); err == nil {
		if (isRunning(pid)) {
			fmt.Printf("Buckle is already running (process: %d)\n", pid)
			fmt.Println("Run 'buckle down' to stop it first.")
			os.Exit(BUCKLE_ALREADY_RUNNING)
		}
		os.Remove(getPidFile())
	}

	binary := getServerBinary()

	if *detach {
		// TODO: Implement detached mode
	} else {
		runServer(binary, *config, *port, *open)
	}
}

func runServer(binary string, config string, port int, open bool) {
	// TODO: Implement server run
	cmd := buildServerCmd(binary, config, port)
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr

	if err := cmd.Start(); err != nil {
		fmt.Fprintf(os.Stderr, "Failed to start server: %v\n", err)
		os.Exit(FAILED_TO_START_SERVER)
	}

	writePid(cmd.Process.Pid)
	defer os.Remove(getPidFile())

	url := fmt.Sprintf("http://localhost:%d", port)
	if err := waitForServer(url + "/api/health"); err != nil {
		// TODO: ...
	}
}

/*
 * Obtain the path to the server binary. The BUCKLE_SERVER_BIN environment variable is set by the 
 * npm shim. Otherwise it will have been installed next to the CLI binary.
 */
func getServerBinary() string {
	if env := os.Getenv("BUCKLE_SERVER_BIN"); env != "" {
		return env
	}
	return filepath.Join(filepath.Dir(os.Args[0]), "buckle-server")
}

func getStateDir() string {
	pwd, err := os.Getwd()
	if err != nil {
		panic(err)
	}
	dir := filepath.Join(pwd, ".buckle")
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

func buildServerCmd(binary string, config string, port int) *exec.Cmd {
	cmd := exec.Command(binary)
	cmd.Env = append(os.Environ(),
		fmt.Sprintf("PORT=%d", port),
		fmt.Sprintf("CONFIG_PATH=%s", config),
	)
	return cmd
}

func openBrowser(url string) {
	switch runtime.GOOS {
	case "darwin": 
		exec.Command("open", url).Start()
	case "windows": 
		exec.Command("cmd", "/c", "start", "", url).Start()
	default: 
		exec.Command("xdg-open", url).Start()
	}
}

/*
 * Check if the process is running by sending a fake signal.
 */
func isRunning(pid int) bool {
	process, err := os.FindProcess(pid)
	if err != nil {
		return false
	}
	return process.Signal(syscall.Signal(0)) == nil
}

/*
 * Wait for the server to start and return the URL.
 */
func waitForServer(url string) error {
	const timeout = 10 * time.Second
	client := &http.Client{Timeout: 2 * time.Second}
	deadline := time.Now().Add(timeout)
	for time.Now().Before(deadline) {
		resp, err := client.Get(url)
		if err == nil && resp.StatusCode == 200 {
			return nil
		}
		time.Sleep(200 * time.Millisecond)
	}
	return fmt.Errorf("timed out after %s", timeout)
}