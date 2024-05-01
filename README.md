# Snakk

This tool lets your translate YAML files using the Google Translate API from the command line.

### Installation
```bash
npm i -g snakk
```
Add your [Google Translate API credentials](https://cloud.google.com/translate/docs) to `$HOME/.google/credentials.json` for example.

Then add the following to your `.bashrc` or `.zshrc`:
```bash
export GOOGLE_APPLICATION_CREDENTIALS="$HOME/.google/credentials.json"
```

### Usage
```bash
# Help
snakk

# Anatomy
snakk translate [input] [output] [from] [to]

# Example
snakk translate en.yml no.yml en no
```

### Supported languages

The languages supported can be found here:

[Google Cloud API Translate Languages](https://cloud.google.com/translate/docs/languages)


### License

ISC licensed. Enjoy!