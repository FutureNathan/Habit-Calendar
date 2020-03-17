import sqlite3
import time
import datetime
from calendar import monthrange

database_dir = '/home/pi/Habit-Calendar/habit-calendar.db'
months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ]

year = 2020

class Calander:
    def __init__(self):
        self.conn = sqlite3.connect(database_dir, check_same_thread=False)
        self.c = self.conn.cursor()  

    def createCalander(self, name):
        name = name.replace(" ", "_")
        try:
            q_string = "CREATE TABLE {} (count INTEGER, Jan INTEGER, Feb INTEGER, Mar INTEGER, Apr INTEGER, May INTEGER, Jun INTEGER, Jul INTEGER, Aug INTEGER, Sep INTEGER, Oct INTEGER, Nov INTEGER, Dec INTEGER )".format(name)
            self.c.execute(q_string)
            self.conn.commit()
            self.resetTable(name)
            return True
        except:
            return False
        

    def deleteCalander(self, name):
        q_string = "DROP TABLE {}".format(name)
        self.c.execute(q_string)
        self.conn.commit()

    def countTables(self):
        q_string = "SELECT count(*) FROM sqlite_master WHERE type = 'table' AND name != 'android_metadata' AND name != 'sqlite_sequence';"
        self.c.execute(q_string)
        data = self.c.fetchall()
        if(data == []):
            return
        data = int(data[0][0])
        return data

    def resetTable(self, name):
        for day in range(0,31):
            row = {}
            q_string = "INSERT INTO {} (count) VALUES({})".format(name, day+1)
            self.c.execute(q_string)
            self.conn.commit()
            for month in range(0,12):
                tot = monthrange(year, month+1)[1]
                if(day < tot):
                    row[months[month]] = 0
            # print("{} : {}".format(day+1, row))
            data = self.dictToString(row)
            q_string = "UPDATE {} SET {} WHERE count = {}".format(name, data, day+1)
            self.c.execute(q_string)
            self.conn.commit()
    
    def dictToString(self, data):
        q = ""
        for i in data:
            if(q != ""):
                q = q + ","
            q = q + i +"=" + str(data[i])
        return q

    


a = Calander()
print(a.createCalander("yolos"))
print(a.countTables())
# a.deleteCalander("Brushing_teat")
# a.test()