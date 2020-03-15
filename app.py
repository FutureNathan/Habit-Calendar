from flask import Flask, render_template, flash, request, url_for, redirect, Response, jsonify
from flask_socketio import SocketIO, emit, send

from werkzeug.datastructures import ImmutableMultiDict


app = Flask(__name__)

app.config['SECRET_KEY'] = 'secret!'

socketio = SocketIO(app)


@app.route('/')
def index():
    return "hello"

@app.route('/test')
def test():
    return render_template("test.html")

@app.route('/calander')
def calender():
    return render_template("calenderTest.html")

if __name__ == '__main__':
    # app.run(host='0.0.0.0',port = 80, threaded=True, debug=True)
    socketio.run(app, host='0.0.0.0', port=80, debug=True)
