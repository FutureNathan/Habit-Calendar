from flask import Flask, render_template, flash, request, url_for, redirect, Response, jsonify
from flask_socketio import SocketIO, emit, send
from werkzeug.datastructures import ImmutableMultiDict
import json

from calanderDatabase import Calander




app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)

db = Calander()

@app.route('/')
def index():
    settings  = db.getSettings()
    return render_template('index.html', settings=settings)

@app.route('/test')
def test():
    return render_template("test.html")

@app.route('/calander')
def calander():
    return render_template("calenderTest.html")

@app.route('/calander_data', methods=["GET","POST"])
def calanderData():
    calander_name = request.args.get('name')
    data = db.getCalanderData(calander_name)
    # data = json.dumps(data)
    return jsonify(data)

if __name__ == '__main__':
    # app.run(host='0.0.0.0',port = 80, threaded=True, debug=True)
    socketio.run(app, host='0.0.0.0', port=80, debug=True)
