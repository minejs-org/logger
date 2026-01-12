<!-- ╔══════════════════════════════ BEG ══════════════════════════════╗ -->

<br>
<div align="center">
    <p>
        <img src="./assets/img/logo.png" alt="logo" style="" height="60" />
    </p>
</div>

<div align="center">
    <img src="https://img.shields.io/badge/v-0.0.1-black"/>
    <a href="https://github.com/minejs-org"><img src="https://img.shields.io/badge/🔥-@minejs-black"/></a>
    <br>
    <img src="https://img.shields.io/badge/coverage-100%25-brightgreen" alt="Test Coverage" />
    <img src="https://img.shields.io/github/issues/minejs-/logger?style=flat" alt="Github Repo Issues" />
    <img src="https://img.shields.io/github/stars/minejs-/logger?style=social" alt="GitHub Repo stars" />
</div>
<br>

<!-- ╚═════════════════════════════════════════════════════════════════╝ -->



<!-- ╔══════════════════════════════ DOC ══════════════════════════════╗ -->

- ## Overview 👀

    - #### Why ?
        > Unified logging interface across your entire stack—server, client, and beyond. Standardizes log formatting and ensures consistent structured data handling throughout your application.

    - #### When ?
        > When you use [@minejs/server](https://github.com/minejs-org/server) or [@cruxjs/app](https://github.com/cruxjs-org/app)

    <br>
    <br>

- ## Quick Start 🔥

    > install [`hmm`](https://github.com/minejs-org/hmm) first.

    ```bash
    # in your terminal
    hmm i @minejs/logger
    ```

    ```ts
    // in your ts files
    import { Logger } from `@minejs/logger`;
    ```

    <div align="center"> <img src="./assets/img/line.png" alt="line" style="display: block; margin-top:20px;margin-bottom:20px;width:500px;"/> </div>
    <br>


    - ### Basic Logging

        ```ts
        // Create a logger instance
        const logger = new Logger('info', false);

        // Log at different levels
        logger.debug({ userId: 123 }, 'User lookup');
        logger.info({ status: 'ready' }, 'Server initialized');
        logger.warn({ memory: '85%' }, 'High memory usage');
        logger.error({ code: 'ECONNREFUSED' }, 'Database connection failed');
        logger.fatal({ error: 'OutOfMemory' }, 'Critical system error');

        // Output (JSON format):
        // {"timestamp":"2024-12-04T01:35:12.665Z","level":"INFO","message":"Server initialized","status":"ready"}
        ```

    - ### Pretty Mode (Human-Readable)

        ```ts
        // Enable pretty mode for colorful, readable logs
        const logger = new Logger('info', true);

        logger.info({ userId: 123 }, 'User authenticated');
        // Output: 01:35:12 ● User authenticated userId:123

        logger.warn({ disk: '90%' }, 'Low disk space');
        // Output: 01:35:12 ⚠ Low disk space disk:90%

        logger.error({ code: 500 }, 'Internal error');
        // Output: 01:35:12 ✖ Internal error code:500
        ```

    - ### HTTP Request Logging (Morgan-Style)

        ```ts
        const logger = new Logger('info', true);

        // Automatically formats HTTP request logs
        logger.info({
            method: 'GET',
            path: '/api/users',
            status: 200,
            duration: 45
        });
        // Output: 01:35:12 GET /api/users 200 45ms (colored)
        ```

    - ### Child Loggers with Prefixes

        ```ts
        const logger = new Logger('info', false);

        // Create namespaced loggers for different services
        const apiLogger = logger.child('API');
        const dbLogger = logger.child('Database');

        apiLogger.info({ endpoint: '/users' }, 'Request received');
        // Output: {"timestamp":"...","level":"INFO","message":"[API] Request received","endpoint":"/users"}

        // Nested child loggers
        const userService = apiLogger.child('Users');
        userService.info({ userId: 123 }, 'User created');
        // Output: {"timestamp":"...","level":"INFO","message":"[API:Users] User created","userId":123}
        ```

    - ### Log Levels & Filtering

        ```ts
        // Set minimum log level (debug < info < warn < error < fatal)
        const logger = new Logger('warn', false);

        logger.debug({ test: 1 }, 'Debug msg');  // ❌ Won't log
        logger.info({ test: 2 }, 'Info msg');    // ❌ Won't log
        logger.warn({ test: 3 }, 'Warning msg'); // ✅ Will log
        logger.error({ test: 4 }, 'Error msg');  // ✅ Will log
        logger.fatal({ test: 5 }, 'Fatal msg');  // ✅ Will log
        ```

    - ### Special Formatting (Pretty Mode)

        ```ts
        const logger = new Logger('info', true);

        // Route registration
        logger.info({ method: 'GET', path: '/api/users' }, 'Route added');
        // Output: 01:35:12 → GET    /api/users

        logger.info({ method: ['GET', 'POST'], path: '/api/auth' }, 'Route added');
        // Output: 01:35:12 → GET|POST /api/auth

        // Database connection
        logger.info({ name: 'PostgreSQL' }, '✔ Database connected');
        // Output: 01:35:12 ✓ Database connected (PostgreSQL)

        // Server startup
        logger.info({ url: 'http://localhost:3000' }, 'Server started');
        // Output: 01:35:12 ✓ Server started at http://localhost:3000
        ```

    - ### String Messages

        ```ts
        const logger = new Logger('info', false);

        // You can pass a string directly as the data parameter
        logger.info('Simple message');
        // Output: {"timestamp":"...","level":"INFO","message":"Simple message"}

        // Works in pretty mode too
        const prettyLogger = new Logger('info', true);
        prettyLogger.info('Application started');
        // Output: 01:35:12 ● Application started
        ```

    <br>
    <br>

- ## Documentation 📑

    - ### API ⛓️

        - #### `new Logger(level, pretty, prefix)`
            > Creates a logger instance with specified configuration.

            ```typescript
            const logger = new Logger('info', true, 'MyApp');
            // level: 'debug' | 'info' | 'warn' | 'error' (default: 'info')
            // pretty: boolean - Enable colored output (default: false)
            // prefix: string - Add prefix to all messages (default: '')
            ```

        - #### `logger.debug(data, message)`
            > Log at debug level (lowest priority).

            ```typescript
            logger.debug({ userId: 123 }, 'User lookup');
            // Only shows if level is set to 'debug'
            ```

        - #### `logger.info(data, message)`
            > Log at info level for general information messages.

            ```typescript
            logger.info({ status: 'ready' }, 'Server initialized');
            ```

        - #### `logger.warn(data, message)`
            > Log at warning level for potential issues.

            ```typescript
            logger.warn({ memory: '85%' }, 'High memory usage');
            ```

        - #### `logger.error(data, message)`
            > Log at error level for application errors.

            ```typescript
            logger.error({ code: 'ECONNREFUSED' }, 'Database connection failed');
            ```

        - #### `logger.fatal(data, message)`
            > Log at fatal level (highest priority) for critical errors.

            ```typescript
            logger.fatal({ error: 'OutOfMemory' }, 'Critical system error');
            ```

        - #### `logger.child(prefix)`
            > Create a child logger with a namespaced prefix.

            ```typescript
            const apiLogger = logger.child('API');
            const userLogger = apiLogger.child('Users');
            // Creates nested prefixes: [API:Users]
            ```

        <div align="center"> <img src="./assets/img/line.png" alt="line" style="display: block; margin-top:20px;margin-bottom:20px;width:500px;"/> </div>
        <br>

    - ### Related 🔗

        - **[@cruxjs/base](https://github.com/cruxjs-org/base)**

        - **[@minejs/server](https://github.com/minejs-org/server)**

<!-- ╚═════════════════════════════════════════════════════════════════╝ -->



<!-- ╔══════════════════════════════ END ══════════════════════════════╗ -->

<br>
<br>

---

<div align="center">
    <a href="https://github.com/maysara-elshewehy"><img src="https://img.shields.io/badge/by-Maysara-black"/></a>
</div>

<!-- ╚═════════════════════════════════════════════════════════════════╝ -->