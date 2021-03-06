# Good-Habits
# `$ Good-Habits` [![Release 1.0.0](https://img.shields.io/badge/Release-1.0.0-green.svg)]
A python based flask Habit tracker, with a responsive design to create manage and markdown your daily habits.
running on a raspberry pi connected to a touch screen display.
Visit the webpage if you want to download a ready made image to minimize the setup process.

Work in progress.
## Contents

 - [How It Works](#prerequisites)
 - [Quick install](#quick-install)
 - [Manual installation](#manual-installation)
 - [Optional services](#optional-services)
 - [How to contribute](#how-to-contribute)
 - [More](#more)
 - [License](#license)
 


## Quick install
Install Habit-Calendar from your RaspberryPi's shell :
```sh
$ wget https://raw.githubusercontent.com/FutureNathan/Habit-Calendar/master/install.sh
$ sudo chmod +x install.sh
$ sudo ./install.sh
```
## Manual installation
1. terminal commands to get everything setup
```sh
$ sudo apt-get update
$ sudo apt-get upgrade
$ sudo apt-get install python3 python3-pip git
$ sudo git clone https://github.com/FutureNathan/Habit-Calendar.git
$ cd Habit-Calendar
```
2. install the python libraries from the requirements.txt
```sh
sudo pip3 install -r requirements.txt
```
3. now edit the Habit-Calendar-Server.service and add the path to this directory in exec start.
4. copy the service file to the system directory
```sh
sudo cp Habit-Calendar-Server.service /etc/systemd/system/Habit-Calendar-Server.service
```
5. enable and start the service
```sh
sudo systemctl enable Habit-Calendar-Server.service
sudo systemctl start Habit-Calendar-Server.service
```
6. setup the appropriate drivers for touchscreen that you choose and link local host on boot.
## How to contribute

1. reports problems and issues in the repo, use the trackers.
2. Fork the project and create new branches.
3. Share the project.

## More
You can check more of my projects and ideas at.
https://www.nathantowianski.com/

## License
See the [LICENSE](./LICENSE) file.
