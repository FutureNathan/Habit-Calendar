import subprocess
import os

MYFILE = '/boot/config.txt'

def commandExec(command):
    try:
        out = subprocess.check_output(command, shell=True)
        return out.decode()
    except:
        return "error"

def GetSetting():
    lines  = open(MYFILE, 'r').readlines()
    lastLine = (lines[-1].rstrip())
    return lastLine

def ChangeSettings(entry):
    lines  = open(MYFILE, 'r').readlines()
    lastLine = (lines[-1].rstrip())
    lines[-1] = entry
    open(MYFILE, 'w').writelines(lines)


rev = commandExec("cat /proc/cpuinfo | grep Revision").replace('\n', '').replace(' ','').split(":")[1]


if(rev=="c03111"):
    set = GetSetting()
    if(set != "#"):
        ChangeSettings("#")
        commandExec("reboot")
else:
    set = GetSetting()
    if(set == "#"):
        ChangeSettings("display_hdmi_rotate=1")
        commandExec("reboot")
