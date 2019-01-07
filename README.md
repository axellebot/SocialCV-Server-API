# Social-CV API
[![MIT Licensed][license-image]][license-url]

## Used Technologies
Server : Express 4.16.3, with nodejs,
Storage : MongoDB, with mongoose 5.0.17,
Communication : JSON.

## Installation

### Config
Use config templates `./config/*.json.dist` to add configuration file `./config/*.json`

### Docker
Run docker build : `docker build ./ -f [Dockerfile.dev|Dockerfile.prod] -t <TAG>`
Run doker image `docker run -p <port_in>:8080 -d <TAG>`

## Sources
- Implementation of OAuth2 inspired from <https://github.com/FrankHassanabad/Oauth2orizeRecipes>

## License

```
    Copyright 2018-2019 Axel LE BOT

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
```

[license-image]: https://img.shields.io/badge/license-Apache%202-blue.svg
[license-url]: ./LICENSE