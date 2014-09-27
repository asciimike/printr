# Printr--The World's First Social Network for Printers

Printr allows users to post messages to the displays on their HP enabled printers in real time, allowing users to easily communicate with each other across great distances using commonly available hardware.

## Setup

### Clone the repo
Clone the repo by using:
```shell
git clone https://github.com/mcdonamp/printr.git
```
### Firebase 
[Sign up](https://www.firebase.com/signup) for a free Firebase account, and create a new Firebase to store your printer 

### Edit and import `printers.json`
This file contains a list of printers, their names, locations, and IP addresses. You can edit it to suit your needs, then upload it to Firebase via the JSON import button on the Firebase dashboard.

## Front End
The front end can be tested locally by spinning up a local python server:

```python
python -m SimpleHTTPServer 8000
```

The front end can then be deployed using:

```shell
npm install -g firebase-tools
firebase init
firebase deploy
```

More info about hosting can be found on the [Firebase Hosting docs](https://www.firebase.com/docs/hosting/guide/deploying.html).

## Back End
The back end is a node process that watches the printer message queue and pulls the most recent message to display it to the given printer. Run the following to start the server:

```shell
node printr-server.js
```

## License
The MIT License (MIT)

Copyright &copy <2014> <Mike McDonald>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.