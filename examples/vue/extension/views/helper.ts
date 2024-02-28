import { Disposable, ExtensionContext, Webview, window } from 'vscode';

export class WebviewHelper {
  public static setupHtml(webview: Webview, context: ExtensionContext) {
    if (process.env.VITE_DEV_SERVER_URL) {
      return __getWebviewHtml__(process.env.VITE_DEV_SERVER_URL);
    }
    return __getWebviewHtml__(webview, context);
  }

  public static setupWebviewHooks(webview: Webview, disposables: Disposable[]) {
    webview.onDidReceiveMessage(
      (message: any) => {
        const command = message.command;
        const text = message.text;
        console.log(`command: ${command}`);
        switch (command) {
          case 'hello':
            window.showInformationMessage(text);
            return;
        }
      },
      undefined,
      disposables,
    );
  }
}