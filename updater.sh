if git checkout deployment &&
    git fetch origin deployment &&
    [ `git rev-list HEAD...origin/deployment --count` != 0 ] &&
    git merge origin/deployment
then
    echo 'Updated!'
    sudo reboot
else
    echo 'Not updated.'
fi