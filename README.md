# Folder Checker
This tool scans trough your folder and compares it with an initialized state.

## Usage

| Command       | Description                                                   |
| ------------- | ------------------------------------------------------------- |
| -i, --init    | initialises all folders, needful if you change the config   |
| -c, --compare | executes the compare workflow once                            |
| -r, --remove  | removes all files from honeypot db and folder                 |
| -t, --time    | executes the compare all {N} sec                              |

## Config File

```JSON
{
  "timeInterval": 60000,

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
  ]
}
```

| Command           | Description                                                       |
| ----------------- | ----------------------------------------------------------------- |
| timeInterval      | all {N} milliseconds the compare algorithm with -t will be executed|
| injectCadence     | every {N}th folder will be used for the honeypot                  |
| injectDirectories | the folders which should be used for injecting                    |
| folders           | folders which will be compared                                    |