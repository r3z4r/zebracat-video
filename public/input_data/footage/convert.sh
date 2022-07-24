#!/usr/bin/zsh bash

for id (**/*.mp4(D)) ffmpeg -i $id -crf 10 "$(echo $id|tr -d .mp4).webm"