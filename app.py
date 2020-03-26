from flask import Flask, render_template, flash, request, url_for, redirect, Response, jsonify
from werkzeug.datastructures import ImmutableMultiDict
from time import sleep
import json
import subprocess
import schedule
import threading

from calendarDatabase import Calendar

app = Flask(__name__)
db = Calendar()
version = "Local V0.71"

@app.route('/', methods=["GET","POST"])
def index():
    settings  = db.getSettings()
    calanders = db.getTableNames()
    tasks     = db.getTaskOrder()
    try: 
        current_cal = int(request.args.get('curr'))
        if(current_cal >len(calanders)):
            current_cal = 0
    except:
        current_cal = 0
    print(current_cal)
    
    print(calanders)
    return render_template('index.html', settings=settings, calanders=calanders, current_cal=current_cal, tasks=tasks, version=version)


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

@app.route('/updatestreak', methods=["GET","POST"])
def updateStreak():
    try:
        month_day = request.args.get('monthday')
        data  = month_day.split('_')
        month = data[1]
        day   = int(data[2])
        print(month, day)
        db.updateStreakDb(month, day)
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

@app.route('/update-task-order', methods=["GET", "POST"])
def updateTaskOrder():
    try:
        if request.method == "POST":
            data = request.values.to_dict(flat= True)
            data = list(data)
            data = data[0]
            data = data.replace("[", "").replace("]", "").replace('"', "")
            data = data.split(",")

            print(data)
            db.updateTaskOrder(data)
            return "1"
    except:
        return "0"

@app.route('/rename-task', methods=["GET", "POST"])
def renameTask():
    try:
        old_name = request.args.get('old_name')
        new_name = request.args.get('new_name')

        print("renaming Tasks")
        db.renameTaskDb(old_name, new_name)
        print("Done")
        return "1"
    except Exception as e:
        print(e)
        return "0"
        
@app.route('/reset-db')
def RESETDB():
    try:
        db.resetDB()
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
    cmd = "bash updater.sh"
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
displayOn()
if __name__ == '__main__':
    threading.Thread(target=schedularThread).start()
    app.run(host='0.0.0.0',port = 80, threaded=True, debug=True)
    
