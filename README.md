# Sonic Admin Portal

Admin Portal for Sonic

## Usage

### Clone or Download Zip

```sh
$ git clone <REPO_URL> 
```

### Install Dependencies

```sh
$ npm install
```

### Run the project

```sh
$ npm start
```

### Run the project in aws instance (production)
in local
```sh
$ npm run make:release:prod 
```
goto aws instance
```sh
$ git fetch origin frontend-release
$ git reset --hard FETCH_HEAD
```