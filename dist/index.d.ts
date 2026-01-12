declare class Logger {
    private level;
    private pretty;
    private prefix;
    private levels;
    private colors;
    constructor(level?: 'debug' | 'info' | 'warn' | 'error', pretty?: boolean, prefix?: string);
    debug(data: unknown, msg?: string): void;
    info(data: unknown, msg?: string): void;
    warn(data: unknown, msg?: string): void;
    error(data: unknown, msg?: string): void;
    fatal(data: unknown, msg?: string): void;
    child(prefix: string): Logger;
    private log;
    private prettyLog;
    private colorizeMethod;
    private colorizeStatus;
    private getLevelIcon;
    private getLevelColor;
}

export { Logger, Logger as default };
