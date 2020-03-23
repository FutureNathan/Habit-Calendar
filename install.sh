apt-get update 
apt-get upgrade -y
apt-get install python3 python3-pip git -y

git clone https://github.com/FutureNathan/Habit-Calendar.git

pip3 install -r Habit-Calendar/requirements.txt

cp Habit-Calendar/Habit-Calendar-Server.service /etc/systemd/system/Habit-Calendar-Servers.service
cp -R Habit-Calendar /var/Habit-Calendar

systemctl enable Habit-Calendar-Server.service
systemctl start Habit-Calendar-Server.service