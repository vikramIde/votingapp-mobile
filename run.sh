#!/bin/bash

quasar clean && sudo quasar build && cd cordova && cordova run && cd ..
