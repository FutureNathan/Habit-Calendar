import schedule
import time

i = 0
start = time.time()

def displayControl():
    on_time = "08:00"
    of_time = "23:00"
    schedule.clear()
    print("once")
    print(time.time() - start)
    schedule.every(3).seconds.do(displayControl)

def commandExec(command):
    try:
        out = subprocess.check_output(command, shell=True)
        return out.decode()
    except:
        return "error"

schedule.every(2).seconds.do(displayControl)


while True:
    
    schedule.run_pending()
    time.sleep(1)
# print(help (schedule))