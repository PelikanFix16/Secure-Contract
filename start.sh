#! /bin/bash

docker-compose up -d


gnome-terminal --title="Truffle" -- docker attach truffle
gnome-terminal --title="Ganache-Cli" -- docker attach ganache
gnome-terminal --title="NodeJs" -- docker attach nodejstest


