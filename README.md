# sourcemapsexample
sourcemaps failed in vscode when debugging nodejs 6.3

Running identical code in chrome vs nodejs : vscode offsets 2 lines !!

Start "Launch express" from launch.json and open localhost:3000 in chrome dev tools to inspect sourcemaps: it is working as expected

Start "Launch Node" from launch.json: the `debugger` breakpoint is offset by 2 lines using 'node2' debugger ('node' debugger is lost and display the transpiled code)

Start "Launch localhost" from launch.json to compare chrome devtools vs vscode chrome debugger: sourcemaps are not applied
