# Install Project
nodejs version 18.20.4

1. Run the following command to install the container
    ```
    docker compose up --build -d
    ```
2. Run the following command to install dependencies
    ```
    docker run --rm -v ${PWD}:/app -w /app node:18.20.4 npm install
    ```

# Run Project
1. Open the `./terminal.bat`
2. Run the following command to start the project in terminal
    ```
    npm start
    ```