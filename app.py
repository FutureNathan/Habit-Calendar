from flask import Flask, render_template, flash, request, url_for, redirect, Response, jsonify
from flask_socketio import SocketIO, emit, send
from werkzeug.datastructures import ImmutableMultiDict
from time import sleep
import json
import subprocess
import schedule
import threading

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

@app.route('/on_time', methods=["GET", "POST"])
def onTimeChange():
    try:
        on_time = request.args.get('on-time')
        db.updateSettings('display_on', on_time)
        displaySchedule()
        return "1"
    except Exception as e:
        print(e)
        return "0"

@app.route('/off_time', methods=["GET", "POST"])
def offTimeChange():
    try:
        off_time = request.args.get('off-time')
        print(off_time)
        db.updateSettings('display_off', off_time)
        displaySchedule()
        return "1"
    except Exception as e:
        print(e)
        return "0"

def displaySchedule():
    schedule.clear()
    data = db.getSettings()
    d_on  = data[1][1]
    d_off = data[2][1]
    print(d_on, d_off)
    print("changing schedules")
    schedule.every().day.at(d_on).do(displayOn)
    schedule.every().day.at(d_off).do(displayOff)

def displayOn():
    cmd = "vcgencmd display_power 1"
    commandExec(cmd)

def displayOff():
    cmd = "vcgencmd display_power 0"
    commandExec(cmd)

def commandExec(command):
    try:
        out = subprocess.check_output(command, shell=True)
        return out.decode()
    except:
        return "error"

def schedularThread():
    while True:
        schedule.run_pending()
        sleep(1)

displaySchedule()

if __name__ == '__main__':
    # app.run(host='0.0.0.0',port = 80, threaded=True, debug=True)
    threading.Thread(target=schedularThread).start()
    socketio.run(app, host='0.0.0.0', port=80, debug=True)
    
