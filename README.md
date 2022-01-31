# Har Har Har Viewer
## The Hacker's Har Viewer

## Features

- Generate functional request code snippets from a request
- Generate TypeScript types from JSON response bodies
- Drag & Drop a HAR file to load in a new HAR.
- Filter by URLs
- Responsive. Works on Mobile sizes.

## Planned Features
- Open a VS Code instance in the browser with the HAR's file structure for easy viewing with one shortcut.
- Generate requests code templates for more languages using a tool like [curlconverter](https://github.com/curlconverter/curlconverter)
- Ability to perform actions on a subset of requests
- Better filtering: (Filter by status codes, headers, etc..)
- Copy headers as JSON
- Light theme

## Installation

Install the dependencies and devDependencies and start the server.

```sh
cd har-viewer
yarn
yarn dev
```

For production environments...

```sh
yarn build
```


## Screenshots

### Request View on a Reddit HAR
![Request view on a Reddit HAR](/assets/request-view.png)

### Response View on a Reddit HAR
![Response view on a Reddit HAR](/assets/response-view.png)

### TypeScript Types Generated From JSON Response
![TypeScript Types Generated From JSON Response](/assets/types.png)

### Responsive!
![Responsive!](/assets/responsive.png)