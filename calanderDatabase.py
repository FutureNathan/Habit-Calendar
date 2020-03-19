import sqlite3
import time
import datetime
from calendar import monthrange

database_dir = '/home/pi/Habit-Calendar/habit-calendar.db'
months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ]



class Calander:
    def __init__(self):
        self.conn = sqlite3.connect(database_dir, check_same_thread=False)
        self.c = self.conn.cursor()  

    # function to create the calander table and call the reset table function to fill the table with empty values
    def createCalander(self, name):
        name = name.replace(" ", "_")
        try:
            q_string = "CREATE TABLE {} (count INTEGER, Jan INTEGER, Feb INTEGER, Mar INTEGER, Apr INTEGER, May INTEGER, Jun INTEGER, Jul INTEGER, Aug INTEGER, Sep INTEGER, Oct INTEGER, Nov INTEGER, Dec INTEGER )".format(name)
            self.c.execute(q_string)
            self.conn.commit()
            self.resetTable(name)
            return True
        except Exception as e:
            print(e)
            return False

    # function to return the calander star data for a given calander
    def getCalanderData(self, name):
        q_string = "SELECT * FROM {}".format(name)
        self.c.row_factory = None
        self.c.execute(q_string)
        data = self.c.fetchall()
        if(data == []):
            return
        complete = []
        for row in data:
            rows = []
            for col in range(1,13):
                if(row[col] != None):
                    rows.append(row[col])
                else:
                    rows.append(2)
            complete.append(rows)
        # print(complete)
        return complete

    # function to update a given calander by name, month and day
    def updateCalander(self, name, month, day, value):
        year = int(self.getSettings()[0][1])
        q_string = "UPDATE {} SET {}={} WHERE count={}".format(name, month, value, day)
        self.c.execute(q_string)
        self.conn.commit()

    def getSingleEntry(self, name, month, day):
        q_string = "SELECT {} FROM {} WHERE count = {}".format(month, name, day)
        self.c.row_factory = None
        self.c.execute(q_string)
        data = self.c.fetchall()
        if(data == []):
            return
        return data

    # function to delete a calander table by its name
    def deleteCalander(self, name):
        q_string = "DROP TABLE {}".format(name)
        self.c.execute(q_string)
        self.conn.commit()

    # Function that returns the names of all the calander tables in the database
    def getTableNames(self):
        q_string = "SELECT name FROM sqlite_master WHERE type='table';"
        self.c.row_factory = None
        self.c.execute(q_string)
        data = self.c.fetchall()
        if(data == []):
            return
        names = []
        for name in data:
            names.append(name[0])
        names.remove("settings")
        return names

    # Function that returns the total number of calander tables in the database
    def countTables(self):
        q_string = "SELECT count(*) FROM sqlite_master WHERE type = 'table' AND name != 'android_metadata' AND name != 'sqlite_sequence';"
        self.c.execute(q_string)
        data = self.c.fetchall()
        if(data == []):
            return
        data = int(data[0][0]) - 1
        return data

    # Function used by the create calander to reset a calander table with zero's
    def resetTable(self, name):
        year = int(self.getSettings()[0][1])
        print(year)
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

    def getSettings(self):
        q_string = "SELECT * FROM settings"
        self.c.row_factory = None
        self.c.execute(q_string)
        data = self.c.fetchall()
        if(data == []):
            return
        
        return data

    def populateSettings(self, key, value):
        q_string = "INSERT INTO settings ('key', 'value') VALUES('{}', '{}')".format(key, value)
        self.c.execute(q_string)
        self.conn.commit()

    def updateSettings(self, key, value):
        q_string = "UPDATE settings SET value = '{}' WHERE key = '{}'".format(value, key)
        self.c.execute(q_string)
        self.conn.commit()

    def getTodaysTask(self, month, day):
        tables = self.getTableNames()
        tasks_list = []
        for table in tables:
            data = self.getSingleEntry(table, month, day)[0][0]
            tasks_list.append(data)
        data = {
            "total": len(tables),
            "incomplete": tasks_list.count(0),
            "complete": tasks_list.count(1)
        }
        return data
    
    # Function to convert dict keys and values to be embedded with the sql query used by the reset function
    def dictToString(self, data):
        q = ""
        for i in data:
            if(q != ""):
                q = q + ","
            q = q + i +"=" + str(data[i])
        return q

    


# a = Calander()
# aa = a.getTodaysTask("Jan", 3)
# print(aa)
# # a.updateCalander("yolos", "Jan", 1, 1)
# a.createCalander("cleaning")
# print(a.getCalanderData('yolo'))
# print(a.getTableNames())
# a.deleteCalander('brushing')

# # print(a.countTables())

# a.updateSettings('year', '2021')
# print(a.createCalander("brushings"))
# # a.populateSettings(v,v)



# print(a.getSettings())