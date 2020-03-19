from flask import Flask, render_template, flash, request, url_for, redirect, Response, jsonify
from flask_socketio import SocketIO, emit, send
from werkzeug.datastructures import ImmutableMultiDict
import json

from calanderDatabase import Calander

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)

db = Calander()

@app.route('/', methods=["GET","POST"])
def index():
    try: 
        current_cal = int(request.args.get('curr'))
    except:
        current_cal = 0
    print(current_cal)
    settings  = db.getSettings()
    calanders = db.getTableNames()
    print(calanders)
    return render_template('index.html', settings=settings, calanders=calanders, current_cal=current_cal)

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

@app.route('/create-task', methods=["GET","POST"])
def createTask():
    try:
        task_name = request.args.get('task-name')
        db.createCalander(task_name)
        return "1"
    except Exception as e:
        print(e)
        return "0"

@app.route('/delete-task', methods=["GET","POST"])
def deleteTask():
    try:
        task_name = request.args.get('task-name')
        db.deleteCalander(task_name)
        return "1"
    except Exception as e:
        print(e)
        return "0"

@app.route('/get-completion', methods=["GET", "POST"])
def completionStatus():
    try:
        month = request.args.get('month');
        day   = request.args.get('day')
        day   = int(day)

        data = db.getTodaysTask(month, day)
        
        return jsonify(data)
    except Exception as e:
        print(e)
        return "0"

if __name__ == '__main__':
    # app.run(host='0.0.0.0',port = 80, threaded=True, debug=True)
    socketio.run(app, host='0.0.0.0', port=80, debug=True)
