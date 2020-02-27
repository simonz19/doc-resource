# node debug

When started with the `--inspect` switch, a Node.js process listens for a debugging client.

Below lists the impact of various runtime flags on debugging:

| flag                     | impact                                                                                                             |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------ |
| --inspect                | Enable inspector agent <br/> Listen on default address and port (127.0.0.1:9229)                                   |
| --inspect[host:port]     | Enable inspector agent <br/> Listen on  address and port (host:port)                                               |
| --inspect-brk            | Enable inspector agent <br/> Listen on default address and port (127.0.0.1:9229)<br/>Break before user code starts |
| --inspect-brk[host:port] | Enable inspector agent <br/> Listen on  address and port (host:port)<br/>Break before user code starts             |
| node inspect script.js   | Spawn child process to run user's script under --inspect flag; and use main process to run CLI debugger.           |
|                          |

As Node noly can provide the litener for debugging client, the debugging client can be **VSCode**, **Chrome** or **node-inspect(bundled with Node.js)**.

**Below introducing different inspector clients work with Node debug listener.**

## VSCode

VSCode has built-in debugging support for `Node.js`. To use VSCode as debug IDE, you should firstly get familiar with `Auto Attach` feature.

There are three options in `Auto Attach` feature, you can find them by Opening setting then search for `node debug`.

- on - the feature will turn on and be showed in the status bar
- off - the feature will turn off and be showed in the status bar
- disable - the feature will turn off and not be showed in the status bar

VSCode will help to automatically attach node debugger to node process of the `script.js` you run by script `node --inspect script.js` with the feature on.

> If you want to attach debugger before script really get running, use `--inspect-brk` switch.

### launch.json

`launch.json` help to set the debug configurations used by **start debugging** in debug pannel.

- type - usually it's `node`
- request - two options: `launch` and `attach`
- name - specify name of each configuration, you can switch debugconfiguration by name in debug pannel.
- program - only for `launch` request, define which file to run when start debugging.

There is another way to attach debugger without `Auto Attach` feature through below configuration:

```json
{
    "type": "node",
    "request": "attach",
    "name": "attach"
}
```

Start debugging of this configutaion can attach debugger to current running node process.

## Chrome

Chrome is another useful detector client with the capability of Chromium core.

Steps of debugging using Chrome:

1. `node --inspect script.js`, the default listener port will be 9229
2. open `chrome://inspect` on chrome browser
3. click `open dedicated DevTools for Node` to configure `Connection`
4. add connection with the inspect listener port.

Like the VSCode, you can add break point for debugging in **Sources** pannel,
search file name by shortcut `ctrl+p` to find the source mapped file.

## node-inspect

A CLI debugger supported by Node.js Foundation.