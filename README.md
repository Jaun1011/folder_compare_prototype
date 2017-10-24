# Folder Checker
This tool scans trough your folder and compares it with an initialized state.


## Compiling
To make a compile execute following commands
``` bash
$ npm install
$ npm run build
```
You can delete the `node_modules` folder if the app is to big.

## Usage

| Command         | Description                                                   |
| ----------------| ------------------------------------------------------------- |
| `-i, --init`    | initialises all folders, needful if you change the config     |
| `-c, --compare` | executes the compare workflow once                            |
| `-d, --delete`  | removes all files from honeypot db and folder                 |
| `-r, --reinject`| reinjects folders                                             |
| `-t, --time`    | executes the compare all `{N}` sec                            |

## Config File

The config file can be found under `./res/conf/folder_config.json`
```JSON
{
  "timeInterval": 60000,
  "logLevel": "debug",
  "injectCadence": 1,
  "injectDirectories": [
    {
      "dir": "./res_test/init_files/",
      "files": [
        "copyfile.txt"
      ]
    }
  ],

  "folders": [
    "./res_test/foldering/"
  ],
  "excludedFolders": [
    "node_modules/async/"
  ]
}
```

| Command             | Description                                                        |
| ------------------- | ------------------------------------------------------------------ |
| `timeInterval`      | all `{N}` milliseconds the compare algorithm with `-t` will be executed|
| `logLevel`          | can be `debug` or `info`|
| `injectCadence`     | every `{N}` th folder will be used for the honeypot                   |
| `injectDirectories` | the folders which should be used for injecting                     |
| `folders`           | folders which will be compared. The values must end with `.../`    |
| `excludedFolders`   | list of folders which are not injected. You can set also a regex    |