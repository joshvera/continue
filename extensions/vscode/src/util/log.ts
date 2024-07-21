import * as vscode from 'vscode';

// Create a single output channel for the extension
const outputChannel = vscode.window.createOutputChannel("Continue");

/**
 * @param cat Type String --> define Category [info,warn,error,debug]
 * @param o Rest Parameter, Type Any --> Data to Log
 */
function log(cat: string, ...o: any) {
  function mapObject(obj: any): string {
    switch (typeof obj) {
      case 'undefined':
        return 'undefined';
      case 'string':
        return obj;
      case 'number':
        return obj.toString();
      case 'object':
        let ret: string = '';
        for (const [key, value] of Object.entries(obj)) {
          ret += (`${key}: ${value}\n`);
        }
        return ret;
      default:
        return String(obj);
    }
  }

  const timestamp = new Date().toISOString().split(".")[0];
  const category = cat.toLowerCase();
  const message = o.map(mapObject).join(' ');
  const logMessage = `[${timestamp}] ${category.toUpperCase()}: ${message}`;

  outputChannel.appendLine(logMessage);
  outputChannel.show(true);

  // Call the appropriate console method based on the category
  switch (category) {
    case 'info':
      console.info(logMessage);
      break;
    case 'warn':
      console.warn(logMessage);
      break;
    case 'error':
      console.error(logMessage);
      vscode.window.showErrorMessage(message);
      break;
    case 'debug':
      console.debug(logMessage);
      break;
    default:
      console.log(logMessage);
  }
}

// Specific logging functions
function info(...args: any[]) {
  log('info', ...args);
}

function warn(...args: any[]) {
  log('warn', ...args);
}

function error(...args: any[]) {
  log('error', ...args);
}

function debug(...args: any[]) {
  log('debug', ...args);
}

// Export everything so they can be used in other parts of the extension
export { log, info, warn, error, debug, outputChannel };
