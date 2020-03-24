import schedule
import time
d_on = "10:21"
extra = 1

print(d_on)
data = d_on.split(":")
minn = int(data[1]) + extra
data[1] = str(minn)
d_on = data[0] + ":" + data[1]
print(d_on)

def update():
    print("update")

schedule.every().day.at(d_on ).do(update)

while True:
    schedule.run_pending()
    time.sleep(1)