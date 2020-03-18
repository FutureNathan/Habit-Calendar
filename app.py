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

@app.route('/calander')
def calander():
    return render_template("calenderTest.html")

@app.route('/calander_data', methods=["GET","POST"])
def calanderData():
    calander_name = request.args.get('name')
    data = db.getCalanderData(calander_name)
    # data = json.dumps(data)
    return jsonify(data)

@app.route('/updatecalander', methods=["GET","POST"])
def updateCalanderApi():
    try:
        calander_name = request.args.get('name')
        month_day     = request.args.get('monthday')
        value         = request.args.get('value')
        data  = month_day.split('_')
        month = data[1]
        day   = int(data[2])
        value = int(value)
        print(calander_name, month, day, value)
        db.updateCalander(calander_name, month, day, value)
        return "1"
    except Exception as e:
        print(e)
        return "0"

if __name__ == '__main__':
    # app.run(host='0.0.0.0',port = 80, threaded=True, debug=True)
    socketio.run(app, host='0.0.0.0', port=80, debug=True)
