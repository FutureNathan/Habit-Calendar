from calendar import monthrange
year = 2020
data = []
# for i in range(1,13):
#     days =  monthrange(year, i)[1]
#     month = []
#     for k in range(1, days+1):
#         if(days == 31):
#             month.append(1)
#         else:
#             month.append(0)
#     data.append(month)


# print(data)

for i in range(1, 32):
    row = []
    for j in range(1,13):
        tot = monthrange(year, j)[1]
        if(i <= tot):
            if( tot == 31):
                row.append(1)
            else:
                row.append(0)
    data.append(row)
# print(data)
# print("rows: ", len(data))
# print("columns: ", len(data[0]))

data = {"yolo":13, "tere": 132, "meow": 32, "crackhead": 44}


q = ""

for i in data:
    if(q != ""):
        q = q + ","
    q = q + i +"=" + str(data[i])
    
print(q)
