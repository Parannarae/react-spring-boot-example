#! /bin/bash

# Link the script to init.d
# sudo ln -s 'full/path/to/jugtours/jugtours.sh' /etc/init.d/jugtours
# Add the service
# sudo update-rc.d jugtours defaults
# Use daemon
# e.g. sudo service jugtours start

start_service() {
    cd /home/ubuntu/jugtours
    java -jar jugtours.jar --server.port=8888 &
}

stop_service() {
    pkill -f 'java -jar'
}

main () {
    case $1 in
        start)
            start_service
        ;;
        stop)
            stop_service
        ;;
        restart)
            stop_service
            start_service
        ;;
    esac
}

main "$@"
